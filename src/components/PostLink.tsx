import { formatDate } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = {
  post: QueriedPostType | null;
};

const PostLink = ({ post }: Props) => {
  const displayDate = post?.createdAt ? formatDate(post?.createdAt) : "";

  return (
    <article>
      <div>
        <h3 className='text-xl mb-2 cursor-pointer'>
          <Link href={`/posts/${post?.id}`}>{post?.title}</Link>
        </h3>
        <h4>{post?.subTitle}</h4>
        <div>
          <span>{post?.author?.username}</span> <span>{displayDate}</span>
        </div>
      </div>
    </article>
  );
};

export default PostLink;
