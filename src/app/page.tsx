import PostResultsSkeleton from "@/components/PostResultsSkeleton";
import RecentPosts from "@/components/RecentPosts";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className='px-8'>
      <Suspense fallback={<PostResultsSkeleton />}>
        <RecentPosts />
      </Suspense>
    </div>
  );
}
