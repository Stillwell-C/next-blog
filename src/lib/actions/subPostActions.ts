"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";
import { formatPostContent } from "../utils";
import { getUser } from "./userActions";

export const createSubPost = async (
  prevState: FormStateType | null,
  formData: FormData
) => {
  const { content, authorId, postId } = Object.fromEntries(formData);

  if (
    typeof content !== "string" ||
    typeof authorId !== "string" ||
    typeof postId !== "string"
  ) {
    return { error: true, errorMsg: "비정상적인 데이터가 전달되었습니다." };
  }

  if (!content && !content.length) {
    return { error: true, errorMsg: "내용은 꼭 입력해주세요." };
  }

  if (!authorId) {
    return { error: true, errorMsg: "답글을 작성하려면 로그인해야 합니다." };
  }

  if (content.length > 1500) {
    return { error: true, errorMsg: "답글은 1500자 이하여야 합니다." };
  }

  const user = await getUser(authorId);
  if (!user) {
    return { error: true, errorMsg: "답글을 작성하려면 로그인해야 합니다." };
  }

  const parsedContent = formatPostContent(content as string);

  try {
    await prisma.subPost.create({
      data: {
        content: parsedContent,
        authorId,
        postId,
      },
    });

    revalidatePath(`/posts/${postId}`);

    return { success: true };
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error - createSubPost: ", err);
    }

    return { error: true, errorMsg: "에로가 발생했습니다" };
  }
};

export const countSubPosts = async (postId: string) => {
  if (typeof postId !== "string") {
    return;
  }

  try {
    return await prisma.subPost.count({
      where: {
        postId,
      },
    });
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error - countSubPosts: ", err);
    }

    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("에로가 발생했습니다");
  }
};

export const getSubPosts = async ({
  postId,
  page = 1,
  take = 5,
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
    const subPosts = await prisma.subPost.findMany({
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
    const subPostCount = (await countSubPosts(postId)) || 0;

    const totalPages = Math.ceil((subPostCount || 0) / take);

    return {
      subPosts,
      currentPage: page,
      totalCount: subPostCount,
      totalPages,
    };
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error - getSubPosts: ", err);
    }

    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("에로가 발생했습니다");
  }
};
