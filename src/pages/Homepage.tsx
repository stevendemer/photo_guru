import PhotoGrid from "components/PhotoGrid";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAtom } from "jotai";
import { useEffect, useState, useRef, useCallback } from "react";
import { queryAtom } from "atoms/queryAtom";
import { topicAtom } from "atoms/topicAtom";
import { titleAtom } from "atoms/titleAtom";
import { subtitleAtom } from "atoms/titleAtom";
import Spinner from "components/Spinner";
import useGetInfinitePhotos from "hooks/useFetchPosts";

const Homepage = () => {
  const [queries, setQueries] = useAtom(queryAtom);
  const [topic, setTopic] = useAtom(topicAtom);
  const postsQuery = useGetInfinitePhotos(["posts"]);

  // when element is in view port then fetch next
  const [title, setTitle] = useAtom(titleAtom);
  const [subtitle, setSubtitle] = useAtom(subtitleAtom);

  useEffect(() => {
    document.title = "Photo Guru";
    setQueries([]);
    setTopic(undefined);
    setTitle("Welcome to Photo Guru");
    setSubtitle("Internet's biggest source of 4K photos");
  }, []);

  if (postsQuery.isLoading) {
    return <Spinner />;
  }

  if (postsQuery.isError) {
    return <div>Error: {postsQuery.error.message}</div>;
  }

  if (postsQuery.isSuccess) {
    console.log(postsQuery.data);
  }

  return (
    <div className="px-4 py-8 w-full ">
      <InfiniteScroll
        hasMore={postsQuery.hasNextPage ?? false}
        endMessage={<p>End of the page</p>}
        dataLength={postsQuery.data.length}
        loader={<Spinner />}
        next={() => postsQuery.fetchNextPage()}
      >
        <PhotoGrid isLoading={postsQuery.isLoading} posts={postsQuery.data} />
      </InfiniteScroll>
    </div>
  );
};

export default Homepage;
