import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import InfiniteScroll from "react-infinite-scroll-component";
import PhotoGrid from "components/PhotoGrid";
import { useQuery, useInfiniteQuery, InfiniteData } from "react-query";
import { getCategories } from "../api/axios";
import { topicAtom } from "atoms/topicAtom";
import { IPhoto } from "../shared/IPhoto";

const Topicpage = () => {
  const topic = useAtomValue(topicAtom);
  const [posts, setPosts] = useState([]);

  const { data, isError, error, isLoading } = useQuery<IPhoto[], Error>(
    ["categories", topic],
    async () => getCategories(topic),
    {
      refetchOnMount: false,
      staleTime: 4000,
      refetchOnWindowFocus: true,
      enabled: !!topic,
    }
  );

  useEffect(() => {
    document.title = "Guru - Topics";
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center text-center">
        <div className="text-xl text-blue-500">Loading...</div>
      </div>
    );
  }

  if (isError) {
    if (error instanceof Error) {
      return (
        <div className="text-red-400 text-center text-xl">{error.message}</div>
      );
    }
  }

  return (
    <>
      <div className="px-4 py-8 w-full">
        <PhotoGrid isLoading={isLoading} posts={data} />
      </div>
    </>
  );
};

export default Topicpage;
