import { getComments } from "@/lib/actions";
import PostCommentsList from "./PostCommentsList";

type Props = {
  postId: string;
};

const PostComments = async ({ postId }: Props) => {
  const commentData = await getComments({ postId });

  return <PostCommentsList initialComments={commentData} postId={postId} />;
};

export default PostComments;
