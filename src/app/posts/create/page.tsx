import CreatePostForm from "@/components/CreatePostForm";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "포스트 작성",
  description: "포스트 작성 페이지",
};

const CreatePost = async () => {
  const session = await auth();

  return <CreatePostForm authorId={session?.user?.id || ""} />;
};

export default CreatePost;
