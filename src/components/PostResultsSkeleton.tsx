import PostCardSkeleton from "./PostCardSkeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PostResultsSkeleton = () => {
  return (
    <div className='mx-auto max-w-3xl flex flex-col gap-6 items-center'>
      <div className='w-full p-4 flex flex-col items-center gap-4'>
        <PostCardSkeleton />
        <PostCardSkeleton />
        <PostCardSkeleton />
        <PostCardSkeleton />
        <PostCardSkeleton />
      </div>
    </div>
  );
};

export default PostResultsSkeleton;
