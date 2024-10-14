import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PostPageSkeleton = () => {
  return (
    <section className='mx-auto p-8 max-w-3xl flex-1'>
      <SkeletonTheme baseColor='#B7BDC2' highlightColor='#E5E7EB'>
        <h2 className='text-2xl mb-8'>
          <Skeleton containerClassName='flex-1' />
        </h2>
        <div className='flex flex-col gap-4'>
          <p>
            <Skeleton count={10} />
          </p>
          <p>
            <Skeleton count={10} />
          </p>
          <p>
            <Skeleton count={10} />
          </p>
          <p>
            <Skeleton count={10} />
          </p>
        </div>
      </SkeletonTheme>
    </section>
  );
};

export default PostPageSkeleton;
