"use client";

import LinkButton from "@/components/LinkButton";

const NotFound = () => {
  return (
    <section className='mx-auto max-w-3xl h-full flex flex-col items-center justify-center gap-10 p-4 text-center'>
      <div>
        <h2 className='text-4xl mb-2'>페이지를 찾을 수 없습니다</h2>
        <p className='text-xl'>
          요청하신 페이지가 존재하지 않거나, 이동되었을 수 있습니다.
        </p>
      </div>
      <div>
        <LinkButton href='/' linkText='홈으로 이동' />
      </div>
    </section>
  );
};

export default NotFound;
