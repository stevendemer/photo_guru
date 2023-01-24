import PhotoGrid from "components/PhotoGrid";
import { IPhoto } from "shared/IPhoto";
import Image from "components/Image";
import { useEffect, useRef } from "react";
import useFetchPosts from "hooks/useFetchPosts";
import InfiniteScroll from "react-infinite-scroll-component";
import { AxiosError } from "axios";
import Skeleton from "react-loading-skeleton";
import { useAtom, useAtomValue } from "jotai";
import { postsAtom } from "../atoms/postsAtom";
import Loader from "components/Loader";
import { useInfiniteQuery } from "react-query";

const Homepage = () => {
  const elementRef = useRef<HTMLInputElement>(null);
  const posts = useAtomValue(postsAtom);

  const { error, isFetchingNextPage, status, hasNextPage, fetchNextPage } =
    useFetchPosts();

  const loadNext = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  if (status === "loading") {
    return <Skeleton />;
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
        <PhotoGrid />
      </InfiniteScroll>
    </div>
  );
};

export default Homepage;
