import React from "react";
import PostCard from "./PostCard";

type Props = {
  posts: FindManyPostType[];
  pageTitle?: string;
};

const PostList = ({ posts, pageTitle = "포스트" }: Props) => {
  return (
    <div className='w-full flex flex-col gap-6 items-center'>
      <h2 className='text-3xl font-semibold'>{pageTitle}</h2>
      <div className='w-full p-4 flex flex-col gap-4'>
        {posts?.map((post, index) => (
          <PostCard post={post} index={index} key={post?.id} />
        ))}
      </div>
    </div>
  );
};

export default PostList;
