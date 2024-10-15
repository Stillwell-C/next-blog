"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";
import { getUser } from "./userActions";

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
      return { error: true, errorMsg: "해당 블로그 글을 찾을 수 없습니다." };
    }

    if (!authorId) {
      return { error: true, errorMsg: "댓글을 남기려면 로그인 해주세요." };
    }

    if (content.length > 500) {
      return { error: true, errorMsg: "댓글은 500자 이하여야 합니다." };
    }

    const user = await getUser(authorId);
    if (!user) {
      return { error: true, errorMsg: "댓글을 작성하려면 로그인해야 합니다." };
    }

    await prisma.comment.create({
      data: {
        postId: postId,
        authorId: authorId,
        content: content,
      },
    });

    revalidatePath(`/posts/${postId}`);

    return { success: true };
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error - createComment: ", err);
    }

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
    if (process.env.NODE_ENV !== "production") {
      console.error("Error - getComments: ", err);
    }

    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("에로가 발생했습니다");
  }
};
