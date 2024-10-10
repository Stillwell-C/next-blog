"use client";

import { createPost } from "@/lib/actions";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import PostForm from "./PostForm";
import { useRouter } from "next/navigation";

type Props = {
  authorId: string;
};

const CreatePostForm = ({ authorId }: Props) => {
  const router = useRouter();

  const [state, formAction] = useFormState(createPost, null);

  useEffect(() => {
    if (state?.success) {
      router.push("/");
    }
  });

  return (
    <PostForm
      authorId={authorId}
      formAction={formAction}
      formState={state}
      buttonText='제출'
    />
  );
};

export default CreatePostForm;
