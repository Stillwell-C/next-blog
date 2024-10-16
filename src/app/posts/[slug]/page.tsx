import React, { Suspense } from "react";
import PostPageSkeleton from "@/components/PostPageSkeleton";
import PostPage from "@/components/PostPage";
import { getPost } from "@/lib/actions/postActions";
import { auth } from "@/lib/auth";
import SubPosts from "@/components/SubPosts";
import PostCommentForm from "@/components/PostCommentForm";
import PostCommentsListSkeleton from "@/components/PostCommentsListSkeleton";
import PostComments from "@/components/PostComments";

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
  const session = await auth();

  return (
    <div className='mx-auto p-8 max-w-3xl'>
      <Suspense fallback={<PostPageSkeleton />}>
        <PostPage slug={slug} />
      </Suspense>
      <SubPosts postId={slug} />
      <PostCommentForm postId={slug} authorId={session?.user?.id} />
      <Suspense fallback={<PostCommentsListSkeleton />}>
        <PostComments postId={slug} />
      </Suspense>
    </div>
  );
};

export default page;
