import React from "react";
import { useFormStatus } from "react-dom";
import { ClipLoader } from "react-spinners";

type Props = {
  buttonText?: string;
  dangerColor?: boolean;
  disable?: boolean;
};

const FormStatusButton = ({
  buttonText = "Submit",
  dangerColor = false,
  disable = false,
}: Props) => {
  const { pending } = useFormStatus();

  const buttonContent = pending ? (
    <ClipLoader size={20} color='rgba(132, 132, 132, 1)' />
  ) : (
    buttonText
  );

  return (
    <button
      type='submit'
      disabled={pending || disable}
      className={`disabled:cursor-not-allowed 
        ${
          dangerColor
            ? "bg-red-500 dark:bg-red-500"
            : "bg-black dark:bg-slate-700"
        } 
        disabled:opacity-50 text-white items-center justify-center 
        py-2 px-8 rounded min-w-28 min-h-11`}
    >
      {buttonContent}
    </button>
  );
};

export default FormStatusButton;
