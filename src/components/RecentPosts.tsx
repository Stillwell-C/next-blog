import React from "react";
import PostLink from "./PostLink";
import { getPosts } from "@/lib/actions";
import LinkButton from "./LinkButton";

const RecentPosts = async () => {
  const postData = await getPosts({ take: 5 });

  return (
    <div className='mx-auto max-w-3xl h-full flex flex-col items-center'>
      <div className='flex-1 flex flex-col gap-6 items-center'>
        <h2 className='text-3xl'>최근 글</h2>
        <div className='flex flex-col gap-4'>
          {postData?.posts?.map((post) => (
            <PostLink post={post} key={post.id} />
          ))}
        </div>
        <LinkButton href='/posts' linkText='모든 글' />
      </div>
    </div>
  );
};

export default RecentPosts;
