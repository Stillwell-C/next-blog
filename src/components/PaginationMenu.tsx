"use client";

import { useCallback } from "react";
import PaginationButton from "./PaginationButton";
import { usePathname, useSearchParams } from "next/navigation";

type Props = {
  currentPage: number;
  totalPages: number;
};

const PaginationMenu = ({ totalPages, currentPage }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  console.log(currentPage);

  const pageUrlGenerator = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page");
      if (page !== 1) params.set("page", page.toString());

      const paramString = params.toString();

      return paramString.length ? `${pathname}?${paramString}` : pathname;
    },
    [searchParams, pathname]
  );

  const menuButtons = [];

  const generatePaginationButton = (key: number, pageNum: number) => (
    <PaginationButton
      key={key}
      pageNum={pageNum}
      currentPageNum={currentPage}
      pageUrlGenerator={pageUrlGenerator}
    />
  );

  if (totalPages <= 10 || currentPage <= 6) {
    const displayCount = totalPages > 10 ? 10 : totalPages;
    for (let i = 1; i <= displayCount; i++) {
      menuButtons.push(generatePaginationButton(i, i));
    }
  } else if (totalPages - currentPage <= 9) {
    for (let i = totalPages - 9; i <= totalPages; i++) {
      menuButtons.push(generatePaginationButton(i, i));
    }
  } else {
    for (let i = currentPage - 4; i <= currentPage + 5; i++) {
      menuButtons.push(generatePaginationButton(i, i));
    }
  }

  return (
    <nav aria-label='포스팅 결과 페이지 메뉴' className='flex gap-2'>
      {menuButtons}
    </nav>
  );
};

export default PaginationMenu;
