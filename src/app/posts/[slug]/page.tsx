import { getPost } from "@/lib/actions";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

const page = async ({ params: { slug } }: Props) => {
  const post = await getPost(slug);

  return (
    <div>
      <h2>{post?.title}</h2>
      <h3>{post?.subTitle}</h3>
      {post?.content.map((paragraph) => (
        <p className='mb-4' key={paragraph.slice(0, 15)}>
          {paragraph}
        </p>
      ))}
    </div>
  );
};

export default page;
