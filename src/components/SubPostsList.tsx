"use client";

import { nextPageConfirmation } from "@/lib/utils";
import { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import SubPostCard from "./SubPostCard";
import { getSubPosts } from "@/lib/actions/subPostActions";

type Props = {
  initialSubPosts:
    | {
        subPosts: SubPostType[];
        currentPage: number;
        totalCount: number;
        totalPages: number;
      }
    | undefined;
  postId: string;
  subPostCount: number;
};

const SubPostsList = ({ initialSubPosts, postId, subPostCount }: Props) => {
  const [subPosts, setSubPosts] = useState<SubPostType[]>(
    initialSubPosts?.subPosts || []
  );
  const [hideSubPosts, setHideSubPosts] = useState(true);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(
    nextPageConfirmation(
      initialSubPosts?.currentPage,
      initialSubPosts?.totalPages
    )
  );
  const [loading, setLoading] = useState(false);

  const loadMoreSubPosts = async () => {
    try {
      setLoading(true);

      const additionalSubPosts = await getSubPosts({ postId, page: page + 1 });

      if (additionalSubPosts?.subPosts.length) {
        setSubPosts((prev) => [...prev, ...additionalSubPosts?.subPosts]);
      }

      setNextPage(
        nextPageConfirmation(
          additionalSubPosts?.currentPage,
          additionalSubPosts?.totalPages
        )
      );

      setPage((prev) => prev + 1);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const chevron = hideSubPosts ? <FaChevronRight /> : <FaChevronDown />;

  return (
    <section>
      <button
        aria-label='답글 표시함'
        className='flex items-center gap-2'
        onClick={() => setHideSubPosts((prev) => !prev)}
      >
        {chevron} <span>답글 ({subPostCount})</span>
      </button>
      {!hideSubPosts && (
        <div className='mt-4'>
          <div className='flex flex-col gap-4 mb-4'>
            {subPosts.map((subPost) => (
              <SubPostCard subPost={subPost} key={subPost.id} />
            ))}
          </div>
          <div>
            {nextPage && (
              <button
                disabled={loading}
                onClick={loadMoreSubPosts}
                className='mt-8 disabled:cursor-not-allowed bg-black white disabled:opacity-50 text-white items-center justify-center py-2 px-8 rounded'
              >
                답글 더 보기
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default SubPostsList;
