"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";
import { getUser } from "./userActions";

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
      return { error: true, errorMsg: "해당 블로그 글을 찾을 수 없습니다." };
    }

    if (content.length > 500) {
      return { error: true, errorMsg: "대댓글은 500자 이하여야 합니다." };
    }

    const user = await getUser(authorId);
    if (!user) {
      return {
        error: true,
        errorMsg: "대댓글을 작성하려면 로그인해야 합니다.",
      };
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
    if (process.env.NODE_ENV !== "production") {
      console.error("Error - createSubComment: ", err);
    }

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
    if (process.env.NODE_ENV !== "production") {
      console.error("Error - getSubComments: ", err);
    }

    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("에로가 발생했습니다");
  }
};
