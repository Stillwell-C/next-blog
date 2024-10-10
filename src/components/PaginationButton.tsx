"use client";

import { useRouter } from "next/navigation";

type Props = {
  pageNum: number;
  currentPageNum: number;
  pageUrlGenerator: (page: number) => string;
};

const PaginationButton = ({
  pageNum,
  currentPageNum,
  pageUrlGenerator,
}: Props) => {
  const router = useRouter();

  const handleRoute = () => {
    const url = pageUrlGenerator(pageNum);
    router.push(url);
  };
  return (
    <button
      className='border border-black rounded w-8 disabled:text-gray-500'
      type='button'
      disabled={currentPageNum === pageNum ? true : false}
      aria-current={currentPageNum === pageNum ? true : false}
      aria-label={
        currentPageNum === pageNum
          ? `현재 페이지이다. 페이지 ${pageNum}`
          : `페이지 ${pageNum}`
      }
      onClick={handleRoute}
    >
      {pageNum}
    </button>
  );
};

export default PaginationButton;
