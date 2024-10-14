import React, { Suspense } from "react";
import PostPageSkeleton from "@/components/PostPageSkeleton";
import PostPage from "@/components/PostPage";

type Props = {
  params: {
    slug: string;
  };
};

const page = async ({ params: { slug } }: Props) => {
  return (
    <Suspense fallback={<PostPageSkeleton />}>
      {" "}
      <PostPage slug={slug} />
    </Suspense>
  );
};

export default page;
