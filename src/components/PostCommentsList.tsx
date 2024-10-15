"use client";

import { useState } from "react";
import PostCommentCard from "./PostCommentCard";
import { nextPageConfirmation } from "@/lib/utils";
import { getComments } from "@/lib/actions/commentActions";

type Props = {
  initialComments:
    | {
        comments: CommentType[];
        currentPage: number;
        totalCount: number;
        totalPages: number;
      }
    | undefined;
  postId: string;
};

const PostCommentsList = ({ initialComments, postId }: Props) => {
  const [comments, setComments] = useState<CommentType[]>(
    initialComments?.comments || []
  );
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(
    nextPageConfirmation(
      initialComments?.currentPage,
      initialComments?.totalPages
    )
  );
  const [loading, setLoading] = useState(false);

  const loadMoreComments = async () => {
    try {
      setLoading(true);

      const additionalComments = await getComments({ postId, page: page + 1 });

      if (additionalComments?.comments.length) {
        setComments((prev) => [...prev, ...additionalComments?.comments]);
      }

      setNextPage(
        nextPageConfirmation(
          additionalComments?.currentPage,
          additionalComments?.totalPages
        )
      );

      setPage((prev) => prev + 1);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const commentDisplay = (
    <div>
      <div className='flex flex-col gap-4'>
        {comments.map((comment) => (
          <PostCommentCard comment={comment} key={comment.id} />
        ))}
      </div>
      {nextPage && (
        <button
          disabled={loading}
          onClick={loadMoreComments}
          className='mt-8 disabled:cursor-not-allowed bg-black white disabled:opacity-50 text-white items-center justify-center py-2 px-8 rounded'
        >
          댓글 더 보기
        </button>
      )}
    </div>
  );

  return commentDisplay;
};

export default PostCommentsList;
