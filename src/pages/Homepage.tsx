import PhotoGrid from "components/PhotoGrid";
import useFetchPosts from "hooks/useFetchPosts";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAtom, useAtomValue } from "jotai";
import Loader from "components/Loader";
import { IPhoto } from "../shared/IPhoto";
import { useEffect } from "react";
import { queryAtom, postsAtom } from "../atoms/postsAtom";

const Homepage = () => {
  const { data, posts, fetchNextPage, isFetchingNextPage, error, hasNextPage } =
    useFetchPosts();

  useEffect(() => {
    document.title = "Guru - Home";
  }, []);

  if (status === "loading") {
    return <Loader />;
  }

  if (status === "error") {
    error instanceof Error && <div>{error.message}</div>;
  }

  return (
    <div className="px-4 py-8 w-full">
      <InfiniteScroll
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={<Loader />}
        dataLength={posts.length}
      >
        <PhotoGrid posts={posts} />
      </InfiniteScroll>
    </div>
  );
};

export default Homepage;
