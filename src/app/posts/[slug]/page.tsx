import LinkButton from "@/components/LinkButton";
import PostCommentForm from "@/components/PostCommentForm";
import PostComments from "@/components/PostComments";
import { getPost } from "@/lib/actions";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

const page = async ({ params: { slug } }: Props) => {
  const post = await getPost(slug);
  const session = await auth();

  const editHref = `/posts/${slug}/edit`;

  if (!post) {
    //TODO: REDIRECT TO ERROR PAGE
    redirect("/");
  }

  return (
    <div className='mx-auto p-8 max-w-3xl'>
      <h2>{post?.title}</h2>
      <h3>{post?.subTitle}</h3>
      {post?.content.map((paragraph) => (
        <p className='mb-4' key={paragraph.slice(0, 15)}>
          {paragraph}
        </p>
      ))}
      {session?.user?.admin && (
        <div className='flex justify-end'>
          <LinkButton href={editHref} linkText='수정' />
        </div>
      )}
      <PostCommentForm postId={post?.id} authorId={session?.user?.id} />
      <PostComments postId={post?.id} />
    </div>
  );
};

export default page;
