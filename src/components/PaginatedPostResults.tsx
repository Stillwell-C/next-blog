import React from "react";
import PaginationMenu from "./PaginationMenu";
import PostResults from "./PostResults";

type Props = {
  postData: PostDataReturnType;
  page: number;
  pageTitle?: string;
};

const PaginatedPostResults = ({ postData, page, pageTitle }: Props) => {
  return (
    <section className='mx-auto max-w-3xl h-full flex flex-col items-center'>
      <PostResults posts={postData.posts} pageTitle={pageTitle} />
      {postData.totalPages > 1 && (
        <PaginationMenu totalPages={postData.totalPages} currentPage={page} />
      )}
    </section>
  );
};

export default PaginatedPostResults;
