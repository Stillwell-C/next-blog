import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;

  const commentId = searchParams.get("commentId")?.toString();
  const page = parseInt(searchParams.get("page") || "1");
  const take = parseInt(searchParams.get("take") || "5");

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

    console.log(subComments);

    return NextResponse.json(
      {
        subComments,
        currentPage: page,
        totalCount: subCommentCount,
        totalPages,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "에로가 발생했습니다" },
      { status: 400 }
    );
  }
};
