import CreatePostReplyForm from "@/components/CreatePostReplyForm";
import { auth } from "@/lib/auth";

type Props = {
  params: {
    slug: string;
  };
};

const page = async ({ params: { slug } }: Props) => {
  const session = await auth();
  return (
    <CreatePostReplyForm authorId={session?.user?.id || ""} postId={slug} />
  );
};

export default page;
