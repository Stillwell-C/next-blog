"use client";

import { useFormState } from "react-dom";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { credentialsLogin, handleGitHubLogin } from "@/app/lib/actions";
import FormStatusButton from "@/app/components/FormStatusSubmitButton";

const LoginForm = () => {
  const errorRef = useRef<HTMLParagraphElement>(null);

  const [state, formAction] = useFormState(credentialsLogin, null);

  useEffect(() => {
    if (state?.error) {
      errorRef?.current?.focus();
    }
  }, [state]);

  return (
    <section className='p-5 flex flex-col border gap-4 border-solid border-black rounded-md'>
      <h2 className='text-center text-2xl bold'>로그인</h2>
      <form action={formAction} className='flex flex-col gap-4'>
        <div className='flex flex-col'>
          <label htmlFor='username' className='ml-2 text-xs'>
            아이디:
          </label>
          <input
            type='text'
            placeholder='아이디'
            id='username'
            name='username'
            className='border border-black rounded-md p-4'
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='password' className='ml-2 text-xs'>
            비밀번호:
          </label>
          <input
            type='password'
            placeholder='비밀번호'
            id='password'
            name='password'
            className='border border-black rounded-md p-4'
          />
        </div>
        <FormStatusButton buttonText='로그인' />
        {state?.error && (
          <p ref={errorRef} className='text-red-500 text-center'>
            {state?.errorMsg}
          </p>
        )}
      </form>
      <Link
        href='/register'
        className='border border-black rounded text-center p-3 w-full'
      >
        회원가입
      </Link>
      <form action={handleGitHubLogin}>
        <button className='bg-black text-white w-full p-3 rounded'>
          GitHub 로그인
        </button>
      </form>
    </section>
  );
};

export default LoginForm;
