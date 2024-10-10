import CreatePostForm from "@/components/CreatePostForm";
import { auth } from "@/lib/auth";
import React from "react";

const CreatePost = async () => {
  const session = await auth();

  return <CreatePostForm authorId={session?.user?.id || ""} />;
};

export default CreatePost;
