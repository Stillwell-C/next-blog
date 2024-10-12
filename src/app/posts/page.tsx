import PostResults from "@/components/PostResults";
import { getPosts } from "@/lib/actions";

type Props = {
  searchParams: {
    page?: string;
  };
};

const PostsPage = async ({ searchParams }: Props) => {
  const page = searchParams?.page ? parseInt(searchParams?.page) : 1;
  const postData = await getPosts({ page });

  return <PostResults postData={postData} page={page} />;
};

export default PostsPage;
