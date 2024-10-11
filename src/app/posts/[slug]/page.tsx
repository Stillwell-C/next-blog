import LinkButton from "@/components/LinkButton";
import PostCommentForm from "@/components/PostCommentForm";
import PostComments from "@/components/PostComments";
import { getPost } from "@/lib/actions";
import { auth } from "@/lib/auth";
import { formatDate } from "@/lib/utils";
import { redirect } from "next/navigation";
import React from "react";
import { RiBook2Fill } from "react-icons/ri";

type Props = {
  params: {
    slug: string;
  };
};

const page = async ({ params: { slug } }: Props) => {
  const post = await getPost(slug);
  const session = await auth();

  const editHref = `/posts/${slug}/edit`;

  const displayDate = post?.createdAt ? formatDate(post?.createdAt) : "";
  const displayEditDate = post?.updatedAt ? formatDate(post?.updatedAt) : "";

  const readingMinutes = Math.ceil(post?.content.length || 0 / 200);

  if (!post) {
    //TODO: REDIRECT TO ERROR PAGE
    redirect("/");
  }

  return (
    <div className='mx-auto p-8 max-w-3xl'>
      <section>
        <h2 className='text-2xl font-semibold'>{post?.title}</h2>
        <h3 className='text-lg'>{post?.subTitle}</h3>
        <div className='mb-8'>
          <div className='flex gap-1 items-center'>
            <RiBook2Fill />
            <span>읽기 시간: {readingMinutes}분</span>
          </div>
          <div className='flex gap-4'>
            <span>{post?.author?.username}</span>
            <span>&#x2022;</span>
            <span>{displayDate}</span>
          </div>
          {post?.editor?.username && (
            <div className='flex gap-4'>
              <span>최신 업데이트</span>
              <span>{post?.editor?.username}</span>
              <span>&#x2022;</span>
              <span>{displayEditDate}</span>
            </div>
          )}
        </div>
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
      </section>
      <PostCommentForm postId={post?.id} authorId={session?.user?.id} />
      <PostComments postId={post?.id} />
    </div>
  );
};

export default page;
