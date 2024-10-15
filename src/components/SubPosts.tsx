import React from "react";
import SubPostsList from "./SubPostsList";
import { countSubPosts, getSubPosts } from "@/lib/actions/subPostActions";

type Props = {
  postId: string;
};

const SubPosts = async ({ postId }: Props) => {
  const subPostCount = await countSubPosts(postId);
  const subPosts = await getSubPosts({ postId });
  return (
    <SubPostsList
      initialSubPosts={subPosts}
      subPostCount={subPostCount || 0}
      postId={postId}
    />
  );
};

export default SubPosts;
