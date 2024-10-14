"use client";

import LinkButton from "@/components/LinkButton";

type Props = {
  error: Error;
  reset: () => void;
};

const Error = ({ error, reset }: Props) => {
  return (
    <section className='mx-auto max-w-3xl h-full flex flex-col items-center justify-center gap-10 p-4 text-center'>
      <div>
        <h2 className='text-4xl mb-2'>{"에로가 발생했습니다 :("}</h2>
        <p className='text-xl'>
          잠시 후 다시 시도해 주세요. 문제가 계속될 경우, 고객센터로 문의해
          주시기 바랍니다.
        </p>
      </div>
      <div className='flex gap-4'>
        <button
          className='bg-black text-white py-2 px-8 rounded'
          onClick={reset}
        >
          다시 시도
        </button>
        <LinkButton href='/' linkText='홈으로 이동' />
      </div>
    </section>
  );
};

export default Error;
