import GetPostResults from "@/components/GetPostResults";
import PostResultsSkeleton from "@/components/PostResultsSkeleton";
import { Suspense } from "react";

type Props = {
  searchParams: {
    page?: string;
  };
};

export const generateMetadata = async ({ searchParams: { page } }: Props) => {
  if (!page) {
    return { title: "포스트", description: "모든 포스트" };
  }

  if (page) {
    return { title: `포스트 | 페이지 ${page}`, description: "모든 포스트" };
  }
};

const PostsPage = async ({ searchParams: { page } }: Props) => {
  return (
    <Suspense fallback={<PostResultsSkeleton />}>
      <GetPostResults page={page} />
    </Suspense>
  );
};

export default PostsPage;
