"use client";

import React, { useEffect, useState } from "react";
import FormStateError from "./FormStateError";
import FormStatusButton from "./FormStatusSubmitButton";
import { useFormState } from "react-dom";
import RedirectLink from "./RedirectLink";
import { createComment } from "@/lib/actions/commentActions";

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
    <p className='text-center'>
      <span>댓글을 작성하려면 </span>
      <RedirectLink pathname='/login' linkText='로그인' />
      <span> 해주세요</span>
    </p>
  );

  const commentForm = (
    <section>
      <form action={formAction} className='flex flex-col gap-4'>
        <h4 className='text-xl'>댓글 쓰기</h4>
        <input
          className='border border-black dark:border-slate-700 rounded-md p-2'
          name='content'
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          maxLength={500}
          autoComplete='off'
        />
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
    </section>
  );

  return <div className='my-10'>{authorId ? commentForm : loginMessage}</div>;
};

export default PostCommentForm;
