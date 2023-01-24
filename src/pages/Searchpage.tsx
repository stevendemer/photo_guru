import { useEffect } from "react";
import { useAtomValue } from "jotai";
import useSearchPost from "hooks/useSearchPost";
import { postsAtom } from "atoms/postsAtom";
import { queryAtom } from "atoms/postsAtom";
import { useAtom } from "jotai";
import Loader from "components/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import PhotoGrid from "components/PhotoGrid";
import { useNavigate } from "react-router-dom";

const Searchpage = () => {
  const [query, setQuery] = useAtom(queryAtom);
  const navigate = useNavigate();
  console.log(query);

  const { status, fetchNextPage, error, hasNextPage, posts } = useSearchPost();
  //   console.log(posts[0].results);

  useEffect(() => {
    document.title = "Smash - Search";
  }, []);

  const loadNext = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

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
        dataLength={posts?.length}
        next={() => fetchNextPage()}
      >
        <PhotoGrid />
      </InfiniteScroll>
    </div>
  );
};

export default Searchpage;
