import { formatDate, resizeCloudinaryImg } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  post: FindManyPostType | null;
  index?: number;
};

const PostCard = ({ post, index }: Props) => {
  const displayDate = post?.createdAt ? formatDate(post?.createdAt) : "";

  const invert = index !== undefined ? index % 2 !== 0 : false;

  return (
    <article
      className={`p-6 w-full flex gap-8 shadow-md rounded-lg ${
        invert && post?.imgUrl ? "flex-row-reverse" : ""
      } items-center`}
    >
      {post?.imgUrl && (
        <div className='w-1/3 h-full flex justify-center'>
          <Image
            src={resizeCloudinaryImg(post?.imgUrl, 300)}
            height={150}
            width={300}
            alt='게시물 이미지'
            className='w-full h-full rounded-lg object-cover'
          />
        </div>
      )}

      <div
        className={`flex flex-col justify-between gap-4 ${
          post?.imgUrl ? "w-2/3" : "w-full"
        }`}
      >
        <h3 className='text-3xl font-semibold cursor-pointer hover:underline'>
          <Link href={`/posts/${post?.id}`}>{post?.title}</Link>
        </h3>
        <div>
          <h4 className='text-xl font-medium text-gray-700'>
            {post?.subTitle}
          </h4>
          <p className='text-sm text-gray-500'>{post?.author?.username}</p>
        </div>
        <p className='text-sm text-gray-400'>{displayDate}</p>
      </div>
    </article>
  );
};

export default PostCard;
