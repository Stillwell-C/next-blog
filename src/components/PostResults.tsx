import React from "react";
import PostLink from "./PostLink";
import PaginationMenu from "./PaginationMenu";

type Props = {
  postData: PostDataReturnType;
  page: number;
  pageTitle?: string;
};

const PostResults = ({ postData, page, pageTitle = "Posts" }: Props) => {
  return (
    <div className='mx-auto max-w-3xl h-full flex flex-col items-center'>
      <div className='flex-1 flex flex-col gap-6 items-center'>
        <h2 className='text-2xl'>{pageTitle}</h2>
        <div className='flex flex-col gap-4'>
          {postData?.posts?.map((post) => (
            <PostLink post={post} key={post?.id} />
          ))}
        </div>
      </div>
      {postData.totalPages > 1 && (
        <PaginationMenu totalPages={postData.totalPages} currentPage={page} />
      )}
    </div>
  );
};

export default PostResults;
