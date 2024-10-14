import GetPostResults from "@/components/GetPostResults";
import PostResultsSkeleton from "@/components/PostResultsSkeleton";
import { Suspense } from "react";

type Props = {
  searchParams: {
    page?: string;
  };
};

const PostsPage = async ({ searchParams: { page } }: Props) => {
  return (
    <Suspense fallback={<PostResultsSkeleton />}>
      <GetPostResults page={page} />
    </Suspense>
  );
};

export default PostsPage;
