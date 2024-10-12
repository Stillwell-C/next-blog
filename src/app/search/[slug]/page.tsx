import PostResults from "@/components/PaginatedPostResults";
import { searchPosts } from "@/lib/actions";

type Props = {
  params: { slug: string };
  searchParams: {
    page?: string;
  };
};

const page = async ({ params: { slug: searchTerm }, searchParams }: Props) => {
  const page = searchParams?.page ? parseInt(searchParams?.page) : 1;
  const searchResults = await searchPosts({
    searchQuery: decodeURI(searchTerm),
    page,
  });

  return (
    <PostResults pageTitle='검색 결과' postData={searchResults} page={page} />
  );
};

export default page;
