import PostResults from "@/components/PaginatedPostResults";
import { searchPosts } from "@/lib/actions/postActions";

type Props = {
  params: { slug: string };
  searchParams: {
    page?: string;
  };
};

export const generateMetadata = async ({
  params: { slug: searchTerm },
  searchParams,
}: Props) => {
  const decodedUri = decodeURI(searchTerm);
  const page = searchParams?.page ? parseInt(searchParams?.page) : 1;

  let title = "검색 결과";
  let description = "검색 결과 페이지";

  if (decodedUri) {
    title = `${decodedUri} | ${title}`;
    description = `${decodedUri} | ${title}`;
  }

  if (page) {
    title += ` | 페이지 ${page}`;
    description += ` | 페이지 ${page}`;
  }

  return { title, description };
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
