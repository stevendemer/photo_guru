// @ts-nocheck

import PhotoGrid from "components/PhotoGrid";
import useFetchPosts from "hooks/useFetchPosts";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAtom } from "jotai";
import Loader from "components/Loader";
import { useEffect } from "react";
import { queryAtom } from "atoms/queryAtom";
import { topicAtom } from "atoms/topicAtom";
import { postsAtom } from "atoms/postsAtom";
import ImageSkeleton from "../components/ImageSkeleton";

const Homepage = () => {
  const [queries, setQueries] = useAtom(queryAtom);
  const [topic, setTopic] = useAtom(topicAtom);

  const { data, isLoading, error, isError, hasNextPage, fetchNextPage } =
    useFetchPosts();

  useEffect(() => {
    document.title = "Photo Guru";
    setQueries([]);
    setTopic(undefined);
  }, []);

  if (isLoading) {
    return <ImageSkeleton images={data?.length} />;
  }

  if (isError) {
    error instanceof Error && <div>{error.message}</div>;
  }

  return (
    <div className="px-4 py-8 w-full ">
      <InfiniteScroll
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={<Loader />}
        dataLength={data?.length}
      >
        <PhotoGrid posts={data} />
      </InfiniteScroll>
    </div>
  );
};

export default Homepage;
