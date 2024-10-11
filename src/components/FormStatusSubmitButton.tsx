import React from "react";
import { useFormStatus } from "react-dom";
import { ClipLoader } from "react-spinners";

type Props = {
  buttonText?: string;
  dangerColor?: boolean;
};

const FormStatusButton = ({
  buttonText = "Submit",
  dangerColor = false,
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
      disabled={pending}
      className={`disabled:cursor-not-allowed bg-black white text-white items-center justify-center py-2 px-8 rounded min-w-28 min-h-11 ${
        dangerColor ? "bg-red-500" : ""
      }`}
    >
      {buttonContent}
    </button>
  );
};

export default FormStatusButton;
