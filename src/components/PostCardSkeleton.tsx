import React from "react";
import Skeleton from "react-loading-skeleton";

const PostCardSkeleton = () => {
  return (
    <div className='p-6 w-full flex gap-8 bg-white shadow-md rounded-lg flex-row-reverse items-center'>
      <div className='w-1/3 h-full'>
        <Skeleton height={180} />
      </div>

      <div className='flex flex-col justify-between gap-4 w-2/3'>
        <h3 className='text-3xl '>
          <Skeleton />
        </h3>
        <div>
          <h4 className='text-xl font-medium'>
            <Skeleton />
          </h4>
          <p className='text-sm '>
            <Skeleton />
          </p>
        </div>
        <p className='text-sm'>
          <Skeleton />
        </p>
      </div>
    </div>
  );
};

export default PostCardSkeleton;
