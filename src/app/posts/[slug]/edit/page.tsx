import { getPost } from "@/lib/actions";
import { auth } from "@/lib/auth";
import EditPostForm from "@/components/EditPostForm";

type Props = {
  params: {
    slug: string;
  };
};

const page = async ({ params: { slug } }: Props) => {
  const post = await getPost(slug);
  const session = await auth();

  return <EditPostForm editorId={session?.user?.id || ""} post={post} />;
};

export default page;
