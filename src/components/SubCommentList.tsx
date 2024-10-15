import { getSubComments } from "@/lib/actions";
import { nextPageConfirmation } from "@/lib/utils";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import SubCommentCard from "./SubCommentCard";
import { IoIosAddCircleOutline } from "react-icons/io";
import SubCommentForm from "./SubCommentForm";

type Props = {
  comment: CommentType;
};

const SubCommentList = ({ comment }: Props) => {
  const { data: session } = useSession();
  const [displaySubCommentForm, setDisplaySubCommentForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subComments, setSubComments] = useState<SubCommentType[]>([]);
  const [subCommentsPage, setSubCommentsPage] = useState(1);
  const [subCommentsNextPage, setSubCommentsNextPage] = useState(false);

  const loadMoreSubComments = async () => {
    try {
      setLoading(true);

      const additionalSubComments = await getSubComments({
        commentId: comment.id,
        page: subCommentsPage,
      });

      if (additionalSubComments?.subComments.length) {
        setSubComments((prev) => [
          ...prev,
          ...additionalSubComments?.subComments,
        ]);
      }

      setSubCommentsNextPage(
        nextPageConfirmation(
          additionalSubComments?.currentPage,
          additionalSubComments?.totalPages
        )
      );

      setSubCommentsPage((prev) => prev + 1);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    //TODO: HANDLE THIS WITH LIBRARY IF POSSIBLE
    //Causes issues in dev mode
    loadMoreSubComments();
  }, []);

  return (
    <div>
      <div className='my-4 flex flex-col gap-4'>
        {subComments.map((subComment) => (
          <SubCommentCard key={subComment.id} subComment={subComment} />
        ))}
      </div>
      {subCommentsNextPage && (
        <div className='mb-2'>
          <button
            aria-label='대댓글 더 보기'
            disabled={loading}
            onClick={loadMoreSubComments}
          >
            <IoIosAddCircleOutline size={20} />
          </button>
        </div>
      )}
      {session?.user?.username?.length && (
        <div>
          <button
            className='mb-2'
            onClick={() => setDisplaySubCommentForm((prev) => !prev)}
          >
            대댓글 쓰기
          </button>
          {displaySubCommentForm && (
            <SubCommentForm
              commentId={comment.id}
              postId={comment.postId}
              authorId={session.user.id}
              setShowState={setDisplaySubCommentForm}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SubCommentList;
