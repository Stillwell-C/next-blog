"use client";

import { useFormState } from "react-dom";
import FormStatusButton from "./FormStatusSubmitButton";
import { createSubPost } from "@/lib/actions";
import { useEffect } from "react";
import FormStateError from "./FormStateError";
import { useRouter } from "next/navigation";

type Props = {
  authorId: string;
  postId: string;
};

const CreatePostReplyForm = ({ authorId, postId }: Props) => {
  const router = useRouter();

  const [state, formAction] = useFormState(createSubPost, null);

  useEffect(() => {
    if (state?.success) {
      router.push(`/posts/${postId}`);
    }
  }, [state]);

  return (
    <form
      className='flex flex-col gap-4 px-8 max-w-3xl mx-auto'
      action={formAction}
    >
      <h2 className='text-center text-xl'>답글</h2>
      <input type='text' name='authorId' value={authorId} hidden readOnly />
      <input type='text' name='postId' value={postId} hidden readOnly />
      <div className='flex flex-col'>
        <label htmlFor='content' className='ml-2 text-xs'>
          답글 내용:
        </label>
        <textarea
          placeholder='내용'
          id='content'
          name='content'
          className='border border-black rounded-md p-4 resize-y h-44'
          maxLength={1500}
        ></textarea>
      </div>
      <FormStatusButton buttonText={"제출"} />
      <FormStateError formState={state} />
    </form>
  );
};

export default CreatePostReplyForm;
