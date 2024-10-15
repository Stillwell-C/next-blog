import React, { Suspense } from "react";
import PostPageSkeleton from "@/components/PostPageSkeleton";
import PostPage from "@/components/PostPage";
import { getPost } from "@/lib/actions";

type Props = {
  params: {
    slug: string;
  };
};

export const generateMetadata = async ({ params: { slug } }: Props) => {
  const post = await getPost(slug);

  if (post?.title) {
    return {
      title: post.title,
      description: post.subTitle || `${post.title} 페이지`,
    };
  }

  return { title: "포스트", description: "포스트 페이지" };
};

const page = async ({ params: { slug } }: Props) => {
  return (
    <Suspense fallback={<PostPageSkeleton />}>
      <PostPage slug={slug} />
    </Suspense>
  );
};

export default page;
