// @ts-nocheck
import { useEffect, useMemo } from "react";
import useSearchPost from "hooks/useSearchPost";
import { queryAtom } from "atoms/postsAtom";
import { useAtom } from "jotai";
import Loader from "components/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import PhotoGrid from "components/PhotoMasonry";
import { useNavigate } from "react-router-dom";
import ImageSkeleton from "../components/ImageSkeleton";
import PhotoMasonry from "components/PhotoMasonry";

const Searchpage = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useSearchPost();

  useEffect(() => {
    document.title = "Guru - Search";
  }, []);

  const loadNext = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    error instanceof Error && <div>{error.message}</div>;
  }

  return (
    <div className="px-4 py-8 sm:w-full">
      <InfiniteScroll
        loader={<Loader />}
        hasMore={!!hasNextPage}
        dataLength={data?.length}
        next={() => fetchNextPage()}
      >
        <PhotoMasonry posts={data} />
      </InfiniteScroll>
    </div>
  );
};

export default Searchpage;
