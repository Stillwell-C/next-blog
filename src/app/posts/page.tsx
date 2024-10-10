import PaginationMenu from "@/components/PaginationMenu";
import PostLink from "@/components/PostLink";
import { getPosts } from "@/lib/actions";

type Props = {
  searchParams: {
    page?: string;
  };
};

const PostsPage = async ({ searchParams }: Props) => {
  const page = searchParams?.page ? parseInt(searchParams?.page) : 1;
  const postData = await getPosts({ page });

  return (
    <div className='mx-auto max-w-3xl h-full flex flex-col items-center'>
      <div className='flex-1 flex flex-col gap-6 items-center'>
        <h2 className='text-3xl'>Posts</h2>
        <div className='flex flex-col gap-4'>
          {postData?.posts?.map((post) => (
            <PostLink post={post} key={post.id} />
          ))}
        </div>
      </div>
      {postData.totalPages > 1 && (
        <PaginationMenu totalPages={postData.totalPages} currentPage={page} />
      )}
    </div>
  );
};

export default PostsPage;
