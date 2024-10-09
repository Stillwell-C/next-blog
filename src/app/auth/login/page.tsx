"use client";

import { useFormState } from "react-dom";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { credentialsLogin, handleGitHubLogin } from "@/app/lib/actions";

const LoginForm = () => {
  const errorRef = useRef<HTMLParagraphElement>(null);

  const [state, formAction] = useFormState(credentialsLogin, null);

  useEffect(() => {
    if (state?.error) {
      errorRef?.current?.focus();
    }
  }, [state]);

  return (
    <div>
      <form action={formAction}>
        <input type='text' placeholder='username' name='username' />
        <input type='password' placeholder='password' name='password' />
        <button type='submit'>Log In</button>
        <p>
          Don&apos;t have an Account?{" "}
          <Link href='/register'>Register here.</Link>
        </p>
        {state?.error && <p ref={errorRef}>{state?.errorMsg}</p>}
      </form>
      <form action={handleGitHubLogin}>
        <button>Log in with GitHub</button>
      </form>
    </div>
  );
};

export default LoginForm;
