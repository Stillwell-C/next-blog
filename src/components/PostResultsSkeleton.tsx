"use client";

import { SkeletonTheme } from "react-loading-skeleton";
import PostCardSkeleton from "./PostCardSkeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PostResultsSkeleton = () => {
  return (
    <div className='mx-auto max-w-3xl flex flex-col gap-6 items-center'>
      <div className='w-full p-8 flex flex-col items-center gap-4'>
        <SkeletonTheme baseColor='#B7BDC2' highlightColor='#E5E7EB'>
          <PostCardSkeleton />
          <PostCardSkeleton />
          <PostCardSkeleton />
          <PostCardSkeleton />
          <PostCardSkeleton />
        </SkeletonTheme>
      </div>
    </div>
  );
};

export default PostResultsSkeleton;
