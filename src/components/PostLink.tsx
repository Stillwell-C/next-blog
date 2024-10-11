import Link from "next/link";
import React from "react";

type Props = {
  post: QueriedPostType | null;
};

const PostLink = ({ post }: Props) => {
  const displayDate = new Date(post?.createdAt || "").toLocaleString("sv-SE", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

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
