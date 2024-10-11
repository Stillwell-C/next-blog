"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import FormStateError from "./FormStateError";
import FormStatusButton from "./FormStatusSubmitButton";
import { createComment } from "@/lib/actions";
import { useFormState } from "react-dom";

type Props = {
  postId: string;
  authorId: string | undefined;
};

const PostCommentForm = ({ postId, authorId }: Props) => {
  const [state, formAction] = useFormState(createComment, null);
  const [commentContent, setCommentContent] = useState("");

  useEffect(() => {
    if (state?.success) {
      setCommentContent("");
    }
  }, [state]);

  const loginMessage = (
    <p>
      댓글을 작성하려면{" "}
      <Link href={"/login"} className='underline'>
        로그인
      </Link>{" "}
      해주세요
    </p>
  );

  const commentForm = (
    <form action={formAction} className='flex flex-col gap-4'>
      <h4 className='text-xl'>댓글 쓰기</h4>
      <textarea
        className='border border-black rounded-md p-4 resize-y h-20'
        name='content'
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
      ></textarea>
      <input type='text' name='authorId' value={authorId} hidden readOnly />
      <input type='text' name='postId' value={postId} hidden readOnly />
      <FormStateError formState={state} />
      <div className='flex justify-end'>
        <FormStatusButton
          buttonText='제출'
          disable={commentContent.length < 1}
        />
      </div>
    </form>
  );

  return <div className='mt-10'>{authorId ? commentForm : loginMessage}</div>;
};

export default PostCommentForm;
