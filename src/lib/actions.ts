"use server";

import { signIn, signOut } from "@/lib/auth";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { CredentialsSignin } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { formatPostContent } from "./utils";
import { uploadFileToCloudinaryFromAction } from "./cloudinaryUtils";
import { revalidatePath } from "next/cache";

export const handleGitHubLogin = async (formData: FormData) => {
  const { redirectUrl } = Object.fromEntries(formData);

  const redirectLink = redirectUrl?.toString()?.length
    ? redirectUrl.toString()
    : "/";

  //CallbackURL 현재 next-auth 버전에서 문제가 있음
  await signIn("github", { callbackUrl: redirectLink });
};

export const handleLogout = async () => {
  await signOut();
};

/**
 * Register a new user
 * @param {RegisterFormStateType} prevState
 * @param {username: string, email: string, password: string, passwordConfirmation: string} formData
 * @returns {FormStateType}
 */
export const registerUser = async (
  prevState: RegisterFormStateType | null,
  formData: FormData
) => {
  const { username, password, passwordConfirmation } =
    Object.fromEntries(formData);

  if (!username || !password || !passwordConfirmation) {
    return { error: true, errorMsg: "Must inclue all fields" };
  }

  if (password !== passwordConfirmation) {
    return { error: true, errorMsg: "비밀번호 일치하지 않습니다" };
  }

  try {
    //TODO TEXT INSENSITIVE
    const user = await prisma.user.findFirst({
      where: { username: username as string },
    });

    if (user) {
      return { error: true, errorMsg: "중복 아이디가 확인되었습니다." };
    }

    //TODO: CHECK user credential length, etc.

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password as string, salt);

    await prisma.user.create({
      data: {
        username: username as string,
        password: hashedPassword,
      },
    });

    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: true, errorMsg: "Something went wrong." };
  }
};

/**
 * Sign in user with username and password
 * @param {FormStateType} prevState
 * @param {username: string, password: string} formData
 * @returns {FormStateType}
 */
export const credentialsLogin = async (
  prevState: FormStateType | null,
  formData: FormData
) => {
  const { username, password, redirectUrl } = Object.fromEntries(formData);

  if (!username || !password) {
    return { error: true, errorMsg: "Please input username and password." };
  }

  const redirectLink = redirectUrl?.toString()?.length ? redirectUrl : "/";

  try {
    const user = await prisma.user.findUnique({
      where: { username: username as string },
    });

    if (user === null) {
      return { error: true, errorMsg: "아이디가 존재하지 않습니다." };
    }

    const passwordCheck = await bcrypt.compare(
      password as string,
      user.password as string
    );

    if (!passwordCheck) {
      return { error: true, errorMsg: "아이디 또는 비밀번호가 맞지 않습니다" };
    }

    await signIn("credentials", {
      redirectTo: redirectLink as string,
      ...user,
    });
    return { success: true };
  } catch (err) {
    if (err instanceof CredentialsSignin) {
      return { error: true, errorMsg: "아이디 또는 비밀번호가 맞지 않습니다" };
    }
    //로그인 문제 발생하지 않아도 패키지 작동 때문에 NEXT_REDIRECT 에로가 로그인 당시에 발생해서 여기 처리됨.
    if (isRedirectError(err)) {
      throw err;
    }
    return { error: true, errorMsg: "Something went wrong" };
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: { id: userId },
      select: {
        username: true,
        imgUrl: true,
        updatedAt: true,
        createdAt: true,
      },
    });

    console.log("getUser ", user);

    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const updateUserImg = async (imgUrl: string, userId: string) => {
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        imgUrl: imgUrl,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

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
    return { error: true, errorMsg: "인증 자격 증명이 없습니다." };
  }

  let imgUrl = null;

  const imageFormData = imageUpload as File;
  if (imageFormData.size > 0) {
    try {
      const res = await uploadFileToCloudinaryFromAction(imageFormData);

      if (!res.error && res.imgUrl) {
        imgUrl = res.imgUrl;
      } else {
        return { error: true, errorMsg: "이미지 업로드 에로가 발생했습니다" };
      }
    } catch (err) {
      console.log(err);
      return { error: true, errorMsg: "이미지 업로드 에로가 발생했습니다" };
    }
  }

  const parsedContent = formatPostContent(content as string);

  const data: PostFormStateType = {
    title: title as string,
    subTitle: subTitle as string,
    content: parsedContent as string,
    authorId: authorId as string,
    imgUrl,
  };

  try {
    await prisma.post.create({
      data: {
        title: data.title,
        subTitle: data.subTitle,
        content: data.content,
        authorId: data.authorId,
        imgUrl: data.imgUrl,
      },
    });

    return { success: true };
  } catch (err) {
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
    //TODO: Remove count
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
      return { error: true, errorMsg: "해당 포스팅을 찾을 수 없습니다." };
    }

    if (!title || !content) {
      return { error: true, errorMsg: "제목과 내용은 꼭 입력해주세요." };
    }

    if (!editorId) {
      return { error: true, errorMsg: "인증 자격 증명이 없습니다." };
    }

    let imgUrl = (existingImgUrl as string) || null;

    const imageFormData = imageUpload as File;
    if (imageFormData.size > 0) {
      try {
        const res = await uploadFileToCloudinaryFromAction(imageFormData);

        if (!res.error && res.imgUrl) {
          imgUrl = res.imgUrl;
        } else {
          return { error: true, errorMsg: "이미지 업로드 에로가 발생했습니다" };
        }
      } catch (err) {
        console.log(err);
        return { error: true, errorMsg: "이미지 업로드 에로가 발생했습니다" };
      }
    }

    const parsedContent = formatPostContent(content as string);

    const data = {
      id: postId as string,
      title: title as string,
      subTitle: subTitle as string,
      content: parsedContent,
      editorId: editorId as string,
      imgUrl,
    };

    await prisma.post.update({
      where: {
        id: data.id,
      },
      data: {
        editorId: data.editorId,
        title: data.title,
        subTitle: data.subTitle,
        content: data.content,
        imgUrl: data.imgUrl,
      },
    });

    revalidatePath(`/posts/${postId}`);

    return { success: true };
  } catch (err) {
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
      return { error: true, errorMsg: "해당 포스팅을 찾을 수 없습니다." };
    }

    if (!editorId) {
      return { error: true, errorMsg: "인증 자격 증명이 없습니다." };
    }

    const data = {
      id: postId as string,
    };

    await prisma.post.delete({
      where: {
        id: data.id,
      },
    });

    return { success: true };
  } catch (err) {
    if (err instanceof Error) {
      return { error: true, errorMsg: err.message };
    }
    return { error: true, errorMsg: "에로가 발생했습니다" };
  }
};

export const createComment = async (
  prevState: FormStateType | null,
  formData: FormData
) => {
  try {
    const { postId, authorId, content } = Object.fromEntries(formData);

    if (
      typeof postId !== "string" ||
      typeof authorId !== "string" ||
      typeof content !== "string"
    ) {
      return { error: true, errorMsg: "비정상적인 데이터가 전달되었습니다." };
    }

    if (!content?.length) {
      return { error: true, errorMsg: "댓글을 입력해주세요." };
    }

    if (!postId) {
      return { error: true, errorMsg: "해당 포스팅을 찾을 수 없습니다." };
    }

    if (!authorId) {
      return { error: true, errorMsg: "댓글을 남기려면 로그인 해주세요." };
    }

    await prisma.comment.create({
      data: {
        postId: postId,
        authorId: authorId,
        content: content,
      },
    });

    return { success: true };
  } catch (err) {
    if (err instanceof Error) {
      return { error: true, errorMsg: err.message };
    }
    return { error: true, errorMsg: "에로가 발생했습니다" };
  }
};

export const getComments = async ({
  postId,
  page = 1,
  take = 10,
}: {
  postId: string;
  page?: number;
  take?: number;
}) => {
  if (typeof postId !== "string") {
    return;
  }

  const skip = page * take - take;

  try {
    const comments = await prisma.comment.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        postId,
      },
      include: {
        author: {
          select: {
            username: true,
            imgUrl: true,
          },
        },
      },
      take,
      skip,
    });
    const commentCount = await prisma.comment.count({
      where: {
        postId,
      },
    });

    const totalPages = Math.ceil(commentCount / take);

    return {
      comments,
      currentPage: page,
      totalCount: commentCount,
      totalPages,
    };
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("에로가 발생했습니다");
  }
};

export const createSubComment = async (
  prevState: FormStateType | null,
  formData: FormData
) => {
  try {
    const { commentId, authorId, postId, content } =
      Object.fromEntries(formData);

    if (
      typeof commentId !== "string" ||
      typeof authorId !== "string" ||
      typeof postId !== "string" ||
      typeof content !== "string"
    ) {
      return { error: true, errorMsg: "비정상적인 데이터가 전달되었습니다." };
    }

    if (!content?.length) {
      return { error: true, errorMsg: "대댓글을 입력해주세요." };
    }

    if (!commentId.length) {
      return { error: true, errorMsg: "해당 댓글을 찾을 수 없습니다." };
    }

    if (!authorId.length) {
      return { error: true, errorMsg: "대댓글을 남기려면 로그인 해주세요." };
    }

    if (!postId.length) {
      return { error: true, errorMsg: "해당 포스팅을 찾을 수 없습니다." };
    }

    await prisma.subComment.create({
      data: {
        commentId: commentId,
        authorId: authorId,
        content: content,
      },
    });

    revalidatePath(`/posts/${postId}`);

    return { success: true };
  } catch (err) {
    if (err instanceof Error) {
      return { error: true, errorMsg: err.message };
    }
    return { error: true, errorMsg: "에로가 발생했습니다" };
  }
};

export const getSubComments = async ({
  commentId,
  page = 1,
  take = 5,
}: {
  commentId: string;
  page?: number;
  take?: number;
}) => {
  if (typeof commentId !== "string") {
    return;
  }

  const skip = page * take - take;

  try {
    const subComments = await prisma.subComment.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        commentId,
      },
      include: {
        author: {
          select: {
            username: true,
            imgUrl: true,
          },
        },
      },
      take,
      skip,
    });
    const subCommentCount = await prisma.subComment.count({
      where: {
        commentId,
      },
    });

    const totalPages = Math.ceil(subCommentCount / take);

    return {
      subComments,
      currentPage: page,
      totalCount: subCommentCount,
      totalPages,
    };
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("에로가 발생했습니다");
  }
};

export const searchPosts = async ({
  searchQuery,
  take = 10,
  page = 1,
}: {
  searchQuery: string;
  take?: number;
  page?: number;
}) => {
  const skip = page * take - take;

  try {
    const postCount = await prisma.post.count({
      where: {
        OR: [
          {
            author: {
              username: {
                contains: searchQuery,
                mode: "insensitive",
              },
            },
          },
          {
            title: {
              contains: searchQuery,
              mode: "insensitive",
            },
          },
          {
            subTitle: {
              contains: searchQuery,
              mode: "insensitive",
            },
          },
          {
            content: {
              contains: searchQuery,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    const posts = await prisma.post.findMany({
      where: {
        OR: [
          {
            author: {
              username: {
                contains: searchQuery,
                mode: "insensitive",
              },
            },
          },
          {
            title: {
              contains: searchQuery,
              mode: "insensitive",
            },
          },
          {
            subTitle: {
              contains: searchQuery,
              mode: "insensitive",
            },
          },
          {
            content: {
              contains: searchQuery,
              mode: "insensitive",
            },
          },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
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
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("에로가 발생했습니다");
  }
};
