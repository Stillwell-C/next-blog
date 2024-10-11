"use client";

import { getComments } from "@/lib/actions";
import { useState } from "react";

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

const nextPageConfirmation = (currentPage = 0, totalPages = 0) => {
  if (!currentPage || !totalPages) return false;

  return totalPages > currentPage;
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
      <div>
        {comments.map((comment) => (
          <div key={comment.id}>
            <div>{comment.content}</div>
            <div>{comment.author.username}</div>
          </div>
        ))}
      </div>
      {nextPage && (
        <button
          disabled={loading}
          onClick={loadMoreComments}
          className='disabled:cursor-not-allowed bg-black white disabled:opacity-50 text-white items-center justify-center py-2 px-8 rounded'
        >
          댓글 더 보기
        </button>
      )}
    </div>
  );

  return commentDisplay;
};

export default PostCommentsList;
