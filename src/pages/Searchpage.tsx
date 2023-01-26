import { useEffect } from "react";
import useSearchPost from "hooks/useSearchPost";
import { queryAtom } from "atoms/postsAtom";
import { useAtom } from "jotai";
import Loader from "components/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import PhotoGrid from "components/PhotoGrid";
import { useNavigate } from "react-router-dom";

const Searchpage = () => {
  const [query, setQuery] = useAtom(queryAtom);
  const navigate = useNavigate();

  const { status, fetchNextPage, error, hasNextPage, posts } = useSearchPost();

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
