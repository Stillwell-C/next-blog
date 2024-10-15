import React from "react";
import Skeleton from "react-loading-skeleton";

const PostCommentCardSkeleton = () => {
  return (
    <div className='flex items-start gap-4'>
      <div className='w-10'>
        <Skeleton height={40} circle />
      </div>
      <div className='flex flex-col flex-1 max-w-80'>
        <span className='text-sm'>
          <Skeleton />
        </span>
        <span className='text-md'>
          <Skeleton />
        </span>
      </div>
    </div>
  );
};

export default PostCommentCardSkeleton;
