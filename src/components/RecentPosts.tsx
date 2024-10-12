import React from "react";
import { getPosts } from "@/lib/actions";
import LinkButton from "./LinkButton";
import PostResults from "./PostResults";

const RecentPosts = async () => {
  const postData = await getPosts({ take: 5 });

  return (
    <div className='mx-auto max-w-3xl h-full flex flex-col items-center'>
      <PostResults posts={postData.posts} pageTitle='최근 글' />
      <div className='mt-6'>
        <LinkButton href='/posts' linkText='모든 글' />
      </div>
    </div>
  );
};

export default RecentPosts;
