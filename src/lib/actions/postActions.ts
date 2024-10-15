"use server";

import { revalidatePath } from "next/cache";
import { uploadFileToCloudinaryFromAction } from "../cloudinaryUtils";
import { prisma } from "../prisma";
import { formatPostContent, isImageFile } from "../utils";
import { getUser } from "./userActions";

export const createPost = async (
  prevState: FormStateType | null,
  formData: FormData
) => {
  const { title, subTitle, content, authorId, imageUpload } =
    Object.fromEntries(formData);

  if (!title || !content) {
    return { error: true, errorMsg: "제목과 내용은 꼭 입력해주세요." };
  }

  if (!authorId) {
    return { error: true, errorMsg: "포스트를 작성하려면 로그인해야 합니다." };
  }

  if (
    typeof title !== "string" ||
    (subTitle && typeof subTitle !== "string") ||
    typeof content !== "string" ||
    typeof authorId !== "string"
  ) {
    return { error: true, errorMsg: "비정상적인 데이터가 전달되었습니다." };
  }

  if (content.length > 15000) {
    return { error: true, errorMsg: "글은 15000자 이하여야 합니다." };
  }

  if (title.length > 250) {
    return { error: true, errorMsg: "글 제목은 250자 이하여야 합니다." };
  }

  if (subTitle.length > 300) {
    return { error: true, errorMsg: "글  부제는 300자 이하여야 합니다." };
  }

  const user = await getUser(authorId);
  if (!user) {
    return { error: true, errorMsg: "포스트를 작성하려면 로그인해야 합니다." };
  }
  if (user?.role === "ADMIN") {
    return {
      error: true,
      errorMsg: "Admin 등급인 계정만 포스트를 작성할 수 있습니다.",
    };
  }

  let imgUrl = null;

  const imageFormData = imageUpload as File;

  const imageCheck = isImageFile(imageFormData);

  if (!imageCheck) {
    return {
      error: true,
      errorMsg: "에로가 발생했습니다. 파일 형식은 이미지 파일이어야 합니다.",
    };
  }

  if (imageFormData.size > 0) {
    try {
      const res = await uploadFileToCloudinaryFromAction(imageFormData);

      if (!res.error && res.imgUrl) {
        imgUrl = res.imgUrl;
      } else {
        return { error: true, errorMsg: "이미지 업로드 에로가 발생했습니다" };
      }
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Error - createPost - imgUpload: ", err);
      }

      return { error: true, errorMsg: "이미지 업로드 에로가 발생했습니다" };
    }
  }

  const parsedContent = formatPostContent(content);

  try {
    await prisma.post.create({
      data: {
        title: title,
        subTitle: subTitle,
        content: parsedContent,
        authorId: authorId,
        imgUrl: imgUrl,
      },
    });

    return { success: true };
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error - createPost: ", err);
    }

    return { error: true, errorMsg: "에로가 발생했습니다" };
  }
};

export const getPosts = async ({
  page = 1,
  take = 10,
  retrieveContent = false,
}) => {
  const skip = page * take - take;

  try {
    const postCount = await prisma.post.count();
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        content: retrieveContent,
        id: true,
        title: true,
        subTitle: true,
        imgUrl: true,
        authorId: true,
        editorId: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            username: true,
          },
        },
      },
      take,
      skip,
    });

    const totalPages = Math.ceil(postCount / take);

    return { posts, currentPage: page, totalCount: postCount, totalPages };
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error - getPosts: ", err);
    }

    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("에로가 발생했습니다");
  }
};

export const getPost = async (postId: string) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        author: {
          select: {
            username: true,
          },
        },
        editor: {
          select: {
            username: true,
          },
        },
      },
    });

    return post;
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error - getPost: ", err);
    }

    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("에로가 발생했습니다");
  }
};

export const editPost = async (
  prevState: FormStateType | null,
  formData: FormData
) => {
  try {
    const {
      postId,
      title,
      subTitle,
      content,
      editorId,
      existingImgUrl,
      imageUpload,
    } = Object.fromEntries(formData);

    if (!postId) {
      return { error: true, errorMsg: "해당 블로그 글을 찾을 수 없습니다." };
    }

    if (!title || !content) {
      return { error: true, errorMsg: "제목과 내용은 꼭 입력해주세요." };
    }

    if (!editorId) {
      return {
        error: true,
        errorMsg: "포스트를 수정하려면 로그인해야 합니다.",
      };
    }

    if (
      typeof postId !== "string" ||
      typeof title !== "string" ||
      (subTitle && typeof subTitle !== "string") ||
      typeof content !== "string" ||
      typeof editorId !== "string"
    ) {
      return { error: true, errorMsg: "비정상적인 데이터가 전달되었습니다." };
    }

    if (content.length > 15000) {
      return { error: true, errorMsg: "글은 15000자 이하여야 합니다." };
    }

    if (title.length > 250) {
      return { error: true, errorMsg: "글 제목은 250자 이하여야 합니다." };
    }

    if (subTitle.length > 300) {
      return { error: true, errorMsg: "글  부제는 300자 이하여야 합니다." };
    }

    const user = await getUser(editorId);
    if (user?.role === "ADMIN") {
      return {
        error: true,
        errorMsg: "Admin 등급인 계정만 포스트를 수정할 수 있습니다.",
      };
    }

    let imgUrl = (existingImgUrl as string) || null;

    const imageFormData = imageUpload as File;

    const imageCheck = isImageFile(imageFormData);

    if (!imageCheck) {
      return {
        error: true,
        errorMsg: "에로가 발생했습니다. 파일 형식은 이미지 파일이어야 합니다.",
      };
    }

    if (imageFormData.size > 0) {
      try {
        const res = await uploadFileToCloudinaryFromAction(imageFormData);

        if (!res.error && res.imgUrl) {
          imgUrl = res.imgUrl;
        } else {
          return { error: true, errorMsg: "이미지 업로드 에로가 발생했습니다" };
        }
      } catch (err) {
        if (process.env.NODE_ENV !== "production") {
          console.error("Error - editPost - imgUpload: ", err);
        }

        return { error: true, errorMsg: "이미지 업로드 에로가 발생했습니다" };
      }
    }

    const parsedContent = formatPostContent(content as string);

    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        editorId: editorId,
        title: title,
        subTitle: subTitle,
        content: parsedContent,
        imgUrl: imgUrl,
      },
    });

    revalidatePath(`/posts/${postId}`);

    return { success: true };
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error - editPost: ", err);
    }

    if (err instanceof Error) {
      return { error: true, errorMsg: err.message };
    }
    return { error: true, errorMsg: "에로가 발생했습니다" };
  }
};

export const deletePost = async (
  prevState: FormStateType | null,
  formData: FormData
) => {
  try {
    const { postId, editorId } = Object.fromEntries(formData);

    if (!postId) {
      return { error: true, errorMsg: "해당 블로그 글을 찾을 수 없습니다." };
    }

    if (!editorId) {
      return {
        error: true,
        errorMsg: "포스트를 삭제하려면 로그인해야 합니다.",
      };
    }

    if (typeof postId !== "string" || typeof editorId !== "string") {
      return { error: true, errorMsg: "비정상적인 데이터가 전달되었습니다." };
    }

    const user = await getUser(editorId);
    if (!user) {
      return {
        error: true,
        errorMsg: "포스트를 삭제하려면 로그인해야 합니다.",
      };
    }
    if (user?.role === "ADMIN") {
      return {
        error: true,
        errorMsg: "Admin 등급인 계정만 포스트를 삭제할 수 있습니다.",
      };
    }

    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    return { success: true };
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error - deletePost: ", err);
    }

    if (err instanceof Error) {
      return { error: true, errorMsg: err.message };
    }
    return { error: true, errorMsg: "에로가 발생했습니다" };
  }
};
