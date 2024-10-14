"use client";

import { handleGitHubLogin, registerUser } from "@/lib/actions";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FormStatusButton from "@/components/FormStatusSubmitButton";
import FormStateError from "@/components/FormStateError";

const RegisterForm = () => {
  const router = useRouter();

  const [state, formAction] = useFormState(registerUser, null);

  useEffect(() => {
    if (state?.success) {
      router.push("/login");
    }
  });

  return (
    <section className='p-8'>
      <div className='mx-auto p-6 max-w-xl flex flex-col border gap-4 border-solid border-black rounded-md'>
        <h2 className='text-center text-2xl bold'>회원가입</h2>
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
          <div className='flex flex-col'>
            <label htmlFor='passwordConfirmation' className='ml-2 text-xs'>
              비밀번호 체크:
            </label>
            <input
              type='password'
              placeholder='비밀번호 체크'
              name='passwordConfirmation'
              id='passwordConfirmation'
              className='border border-black rounded-md p-4'
            />
          </div>
          <FormStatusButton buttonText='회원가입' />
          <FormStateError formState={state} />
        </form>
        <Link
          href='/login'
          className='border border-black rounded text-center p-3 w-full'
        >
          로그인
        </Link>
        <form action={handleGitHubLogin}>
          <button className='bg-black text-white w-full p-3 rounded'>
            GitHub 로그인
          </button>
        </form>
      </div>
    </section>
  );
};

export default RegisterForm;
