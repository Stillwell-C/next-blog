"use client";

import { useEffect, useRef } from "react";

type Props = {
  formState: FormStateType | null;
};

const FormStateError = ({ formState }: Props) => {
  const errorRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (formState?.error) {
      errorRef?.current?.focus();
    }
  }, [formState]);

  return (
    formState?.error === true && (
      <p ref={errorRef} className='text-red-500 text-center'>
        {formState?.errorMsg}
      </p>
    )
  );
};

export default FormStateError;
