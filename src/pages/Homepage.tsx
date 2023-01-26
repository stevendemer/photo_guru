import PhotoGrid from "components/PhotoGrid";
import Image from "components/Image";
import useFetchPosts from "hooks/useFetchPosts";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAtom, useAtomValue } from "jotai";
import { postsAtom } from "../atoms/postsAtom";
import Loader from "components/Loader";
import { useInfiniteQuery } from "react-query";

const Homepage = () => {
  const posts = useAtomValue(postsAtom);

  const { error, isFetchingNextPage, status, hasNextPage, fetchNextPage } =
    useFetchPosts();

  if (status === "loading") {
    return <Loader />;
  }

  if (status === "error") {
    error instanceof Error && <div>{error.message}</div>;
  }

  return (
    <div className="px-4 py-8 sm:w-full">
      <InfiniteScroll
        loader={<Loader />}
        hasMore={!!hasNextPage}
        dataLength={posts.length}
        next={() => fetchNextPage()}
      >
        {isFetchingNextPage && <Loader />}
        <PhotoGrid />
      </InfiniteScroll>
    </div>
  );
};

export default Homepage;
