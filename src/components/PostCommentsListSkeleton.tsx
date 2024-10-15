import React from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import PostCommentCardSkeleton from "./PostCommentCardSkeleton";

const PostCommentsListSkeleton = () => {
  return (
    <div className='flex flex-col gap-4'>
      <SkeletonTheme baseColor='#B7BDC2' highlightColor='#E5E7EB'>
        <PostCommentCardSkeleton />
        <PostCommentCardSkeleton />
        <PostCommentCardSkeleton />
        <PostCommentCardSkeleton />
      </SkeletonTheme>
    </div>
  );
};

export default PostCommentsListSkeleton;
