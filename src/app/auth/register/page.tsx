"use client";

import { registerUser } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const errorRef = useRef<HTMLParagraphElement>(null);
  const router = useRouter();

  const [state, formAction] = useFormState(registerUser, null);

  useEffect(() => {
    if (state?.error) {
      errorRef?.current?.focus();
    }
  }, [state]);

  useEffect(() => {
    if (state?.success) {
      router.push("/auth/login");
    }
  });

  return (
    <form action={formAction}>
      <input type='text' placeholder='username' name='username' />
      <input type='password' placeholder='password' name='password' />
      <input
        type='password'
        placeholder='confirm password'
        name='passwordConfirmation'
      />
      <button type='submit'>Register</button>
      <p>
        Already have an Account? <Link href='/login'>Login here.</Link>
      </p>
      {state?.error && <p ref={errorRef}>{state?.errorMsg}</p>}
    </form>
  );
};

export default RegisterForm;
