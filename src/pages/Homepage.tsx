import PhotoGrid from "components/PhotoGrid";
import Image from "components/Image";
import useFetchPosts from "hooks/useFetchPosts";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAtom, useAtomValue } from "jotai";
import Loader from "components/Loader";
import { IPhoto } from "../shared/IPhoto";
import { useEffect } from "react";
import { queryAtom } from "../atoms/postsAtom";

const Homepage = () => {
  const { data, fetchNextPage, isFetchingNextPage, error, hasNextPage } =
    useFetchPosts();

  const [queries, setQueries] = useAtom(queryAtom);

  useEffect(() => {
    if (queries) {
      setQueries([]);
    }
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
        dataLength={data.length}
      >
        <PhotoGrid posts={data} />
      </InfiniteScroll>
    </div>
  );
};

export default Homepage;
