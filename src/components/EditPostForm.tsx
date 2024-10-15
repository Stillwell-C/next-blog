"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import PostForm from "./PostForm";
import { useRouter } from "next/navigation";
import DeletePostForm from "./DeletePostForm";
import { deletePost, editPost } from "@/lib/actions/postActions";

type Props = {
  editorId: string;
  post?: QueriedPostType | null;
};

const EditPostForm = ({ editorId, post }: Props) => {
  const router = useRouter();

  const [editState, editFormAction] = useFormState(editPost, null);
  const [deleteState, deleteFormAction] = useFormState(deletePost, null);

  useEffect(() => {
    if (editState?.success) {
      if (post?.id) {
        router.push(`/posts/${post?.id}`);
      } else {
        router.push("/posts");
      }
    }

    if (deleteState?.success) {
      router.push("/posts");
    }
  }, [editState, deleteState]);

  return (
    <div>
      <PostForm
        editorId={editorId}
        post={post}
        formAction={editFormAction}
        formState={editState}
        buttonText='수정'
      />
      <DeletePostForm
        editorId={editorId}
        postId={post?.id || ""}
        formAction={deleteFormAction}
        formState={deleteState}
      />
    </div>
  );
};

export default EditPostForm;
