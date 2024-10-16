import { auth } from "@/lib/auth";
import { formatDate, resizeImg } from "@/lib/utils";
import Image from "next/image";
import { notFound } from "next/navigation";
import { RiBook2Fill } from "react-icons/ri";
import LinkButton from "./LinkButton";
import { getPost } from "@/lib/actions/postActions";

type Props = {
  slug: string;
};

const PostPage = async ({ slug }: Props) => {
  const post = await getPost(slug);
  const session = await auth();

  const editHref = `/posts/${slug}/edit`;
  const replyHref = `/posts/${slug}/reply`;

  const displayDate = post?.createdAt ? formatDate(post?.createdAt) : "";
  const displayEditDate = post?.updatedAt ? formatDate(post?.updatedAt) : "";

  const readingMinutes = Math.ceil((post?.content.length || 0) / 300);

  if (!post) {
    notFound();
  }

  return (
    <section>
      {post?.imgUrl && (
        <div className='mx-auto mb-8 relative w-96 h-64 overflow-hidden'>
          <Image
            src={resizeImg(post.imgUrl, 500)}
            fill
            alt='게시물 이미지'
            className='w-full h-full rounded-lg'
          />
        </div>
      )}
      <h2 className='text-3xl font-semibold'>{post?.title}</h2>
      <h3 className='text-xl font-medium text-gray-700 dark:text-gray-400'>
        {post?.subTitle}
      </h3>
      <div className='mb-8'>
        <div className='flex gap-1 items-center dark:text-gray-400'>
          <RiBook2Fill />
          <span>읽기 시간: {readingMinutes}분</span>
        </div>
        <div className='flex gap-4 text-sm text-gray-500'>
          <span>{post?.author?.username}</span>
          <span>&#x2022;</span>
          <span>{displayDate}</span>
        </div>
        {post?.editor?.username && (
          <div className='flex gap-4 text-sm text-gray-500'>
            <span>최신 업데이트</span>
            <span>&#x2022;</span>
            <span>{post?.editor?.username}</span>
            <span>&#x2022;</span>
            <span>{displayEditDate}</span>
          </div>
        )}
      </div>
      {post?.content.split("\n").map((paragraph: string) => (
        <p className='mb-4' key={paragraph.slice(0, 15)}>
          {paragraph}
        </p>
      ))}

      <div className='flex gap-4 justify-end'>
        {session?.user && <LinkButton href={replyHref} linkText='답글 쓰기' />}
        {session?.user?.admin && <LinkButton href={editHref} linkText='수정' />}
      </div>
    </section>
  );
};

export default PostPage;
