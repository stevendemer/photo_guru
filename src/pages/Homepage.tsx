import InfiniteScroll from "react-infinite-scroll-component";
import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { queryAtom } from "atoms/queryAtom";
import { topicAtom } from "atoms/topicAtom";
import { titleAtom } from "atoms/titleAtom";
import { subtitleAtom } from "atoms/titleAtom";
import Spinner from "components/Spinner";
import { RESET } from "jotai/utils";
import PhotoMasonry from "components/PhotoMasonry";
import { IPhoto } from "shared/IPhoto";
import axios from "../api/axios";
import { useQuery } from "react-query";
import { useIntersectionObserver } from "usehooks-ts";
import { toast } from "react-toastify";

async function fetchData(pageNumber: number): Promise<IPhoto> {
  return (await axios.get(`/photos?page=${pageNumber}&per_page=15`)).data;
}

const Homepage = () => {
  const [queries, setQueries] = useAtom(queryAtom);
  const [topic, setTopic] = useAtom(topicAtom);
  // const postsQuery = useFetchInfinitePosts(["posts"]);
  const [page, setPage] = useState<number>(1);

  const {
    data,
    isLoading,
    isSuccess,
    error,
    isError,
    isPreviousData,
    isFetching,
  } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => fetchData(page),
    keepPreviousData: true,
    retry: 2,
    onError: (error) =>
      toast.error("Error fetching the posts " + (error as Error).message),
  });

  // when element is in view port then fetch next
  const [title, setTitle] = useAtom(titleAtom);
  const [subtitle, setSubtitle] = useAtom(subtitleAtom);

  useEffect(() => {
    document.title = "Photo Guru";
    setQueries([]);
    setTopic(RESET);
    setTitle(RESET);
    setSubtitle(RESET);
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  if (isSuccess) {
    console.log("The infinite data is : ", data);
  }

  return (
    <div className="px-4 py-8 w-full">
      <PhotoMasonry isLoading={isLoading} posts={data} />
      <div className="relative flex justify-between mx-10 items-center">
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
          disabled={page === 0}
          className={`text-lg bg-cyan-600 rounded-full px-2 py-1 text-slate-200 mx-10 hover:bg-cyan-700 ${
            page === 0 && "bg-cyan-700/50"
          }`}
        >
          Previous page
        </button>
        <button
          onClick={() => {
            if (!isPreviousData && data) {
              setPage((old) => old + 1);
            }
          }}
          disabled={isPreviousData || !data}
          className={`text-lg bg-lime-500 rounded-full px-2 py-1 text-slate-200 mx-10 hover:bg-lime-600 ${
            (isPreviousData || !data) && "bg-lime-500/50"
          }`}
        >
          Next page
        </button>
        {isFetching ? <Spinner /> : null}
      </div>
    </div>
  );
};

export default Homepage;
