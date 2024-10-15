"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import FormStatusButton from "@/components/FormStatusSubmitButton";
import FormStateError from "@/components/FormStateError";
import { useSearchParams } from "next/navigation";
import GithubLoginForm from "@/components/GithubLoginForm";
import { credentialsLogin } from "@/lib/actions/authActions";

const LoginForm = () => {
  const [state, formAction] = useFormState(credentialsLogin, null);
  const searchParams = useSearchParams();

  const redirectUrl = searchParams.get("redirectTo") || "";

  return (
    <section className='p-8'>
      <div className='mx-auto p-6 max-w-xl flex flex-col border gap-4 border-solid border-black dark:border-slate-700 rounded-md'>
        <h2 className='text-center text-2xl bold'>로그인</h2>
        <form action={formAction} className='flex flex-col gap-4'>
          <input name='redirectUrl' value={redirectUrl} hidden readOnly />
          <div className='flex flex-col'>
            <label htmlFor='username' className='ml-2 text-xs'>
              아이디:
            </label>
            <input
              type='text'
              placeholder='아이디'
              id='username'
              name='username'
              className='border border-black dark:border-slate-700 rounded-md p-4'
              maxLength={30}
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
              className='border border-black dark:border-slate-700 rounded-md p-4'
              maxLength={50}
            />
          </div>
          <FormStatusButton buttonText='로그인' />
          <FormStateError formState={state} />
        </form>
        <Link
          href='/register'
          className='border border-black dark:border-slate-700 rounded text-center p-3 w-full'
        >
          회원가입
        </Link>
        <GithubLoginForm />
      </div>
    </section>
  );
};

export default LoginForm;
