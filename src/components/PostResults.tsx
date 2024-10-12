import React from "react";
import PostLink from "./PostLink";

type Props = {
  posts: FindManyPostType[];
  pageTitle?: string;
};

const PostResults = ({ posts, pageTitle = "Posts" }: Props) => {
  return (
    <div className='flex-1 flex flex-col gap-6 items-center'>
      <h2 className='text-2xl'>{pageTitle}</h2>
      <div className='flex flex-col gap-4'>
        {posts?.map((post) => (
          <PostLink post={post} key={post?.id} />
        ))}
      </div>
    </div>
  );
};

export default PostResults;
