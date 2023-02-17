import PhotoGrid from "components/PhotoGrid";
import useFetchPosts from "hooks/useFetchPosts";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAtom } from "jotai";
import { useEffect, useState, useRef, useCallback } from "react";
import { queryAtom } from "atoms/queryAtom";
import { topicAtom } from "atoms/topicAtom";
import { titleAtom } from "atoms/titleAtom";
import { subtitleAtom } from "atoms/titleAtom";

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
  const [title, setTitle] = useAtom(titleAtom);
  const [subtitle, setSubtitle] = useAtom(subtitleAtom);

  useEffect(() => {
    document.title = "Photo Guru";
    setQueries([]);
    setTopic(undefined);
    setTitle("Welcome to Photo Guru");
    setSubtitle("Internet's biggest source of 4K photos");
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
