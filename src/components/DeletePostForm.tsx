import React from "react";
import FormStatusButton from "./FormStatusSubmitButton";
import FormStateError from "./FormStateError";

type Props = {
  postId: string;
  editorId: string;
  formAction: (payload: FormData) => void;
  formState: FormStateType | null;
};

const DeletePostForm = ({ postId, editorId, formAction, formState }: Props) => {
  return (
    <form
      action={formAction}
      className='flex flex-col mt-4 px-8 max-w-3xl mx-auto'
    >
      <input type='text' name='editorId' value={editorId} hidden readOnly />
      <input type='text' name='postId' value={postId} hidden readOnly />
      <FormStatusButton buttonText='삭제' dangerColor={true} />
      <FormStateError formState={formState} />
    </form>
  );
};

export default DeletePostForm;
