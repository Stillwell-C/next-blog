import PaginatedPostResults from "./PaginatedPostResults";
import { getPosts } from "@/lib/actions";

type Props = {
  page?: string;
};

const GetPostResults = async ({ page }: Props) => {
  const parsedPage = page ? parseInt(page) : 1;
  const postData = await getPosts({ page: parsedPage });

  return <PaginatedPostResults postData={postData} page={parsedPage} />;
};

export default GetPostResults;
