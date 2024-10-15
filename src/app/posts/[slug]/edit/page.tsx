import { getPost } from "@/lib/actions";
import { auth } from "@/lib/auth";
import EditPostForm from "@/components/EditPostForm";
import { Metadata } from "next";

type Props = {
  params: {
    slug: string;
  };
};

export const metadata: Metadata = {
  title: "포스트 수정",
  description: "포스트 수정 페이지",
};

const page = async ({ params: { slug } }: Props) => {
  const post = await getPost(slug);
  const session = await auth();

  return <EditPostForm editorId={session?.user?.id || ""} post={post} />;
};

export default page;
