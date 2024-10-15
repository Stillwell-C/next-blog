import CreatePostReplyForm from "@/components/CreatePostReplyForm";
import { auth } from "@/lib/auth";
import { Metadata } from "next";

type Props = {
  params: {
    slug: string;
  };
};

export const metadata: Metadata = {
  title: "답글 쓰기",
  description: "답글 쓰기 페이지",
};

const page = async ({ params: { slug } }: Props) => {
  const session = await auth();

  return (
    <CreatePostReplyForm authorId={session?.user?.id || ""} postId={slug} />
  );
};

export default page;
