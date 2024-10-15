import React, { useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import FormStatusButton from "./FormStatusSubmitButton";
import FormStateError from "./FormStateError";
import { useFormState } from "react-dom";
import { createSubComment } from "@/lib/actions/subCommentActions";

type Props = {
  setShowState: React.Dispatch<React.SetStateAction<boolean>>;
  commentId: string;
  postId: string;
  authorId: string;
};

const SubCommentForm = ({
  setShowState,
  commentId,
  postId,
  authorId,
}: Props) => {
  const [state, formAction] = useFormState(createSubComment, null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state?.success) {
      if (inputRef?.current) {
        inputRef.current.value = "";
        setShowState(false);
      }
    }
  }, [state]);

  return (
    <form action={formAction}>
      <div className='flex gap-4'>
        <div className='w-full flex border border-black dark:border-slate-700 rounded'>
          <button
            type='button'
            className='p-1'
            onClick={() => setShowState(false)}
          >
            <IoMdClose />
          </button>
          <input
            type='text'
            name='commentId'
            hidden
            value={commentId}
            readOnly
          />
          <input type='text' name='postId' hidden value={postId} readOnly />
          <input type='text' name='authorId' hidden value={authorId} readOnly />
          <input
            type='text'
            name='content'
            className='p-2 w-full  rounded outline-none'
            autoComplete='off'
            ref={inputRef}
            maxLength={500}
          />
        </div>
        <FormStatusButton buttonText='제출' />
      </div>
      <FormStateError formState={state} />
    </form>
  );
};

export default SubCommentForm;
