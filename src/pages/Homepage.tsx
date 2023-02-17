import PhotoGrid from "components/PhotoGrid";
import useFetchPosts from "hooks/useFetchPosts";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAtom } from "jotai";
import { useEffect, useState, useRef, useCallback } from "react";
import { queryAtom } from "atoms/queryAtom";
import { topicAtom } from "atoms/topicAtom";
import { queryClient } from "../main";

const Homepage = () => {
  const [queries, setQueries] = useAtom(queryAtom);
  const [topic, setTopic] = useAtom(topicAtom);
  const {
    data: posts,
    isLoading,
    hasNextPage,
    error,
    isSuccess,
    isError,
    fetchNextPage,
  } = useFetchPosts();

  // when element is in view port then fetch next
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.title = "Photo Guru";
    setQueries([]);
    setTopic(undefined);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    error instanceof Error && <div>{error.message}</div>;
  }

  return (
    <div className="px-4 py-8 w-full ">
      <InfiniteScroll
        hasMore={hasNextPage}
        endMessage={<p>End of page</p>}
        dataLength={posts.length}
        next={() => fetchNextPage()}
      >
        <PhotoGrid isLoading={isLoading} posts={posts} />
      </InfiniteScroll>
    </div>
  );
};

export default Homepage;
