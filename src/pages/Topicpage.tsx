import { useEffect, useState } from "react";
import { queryAtom } from "atoms/postsAtom";
import { useAtom, useAtomValue } from "jotai";
import Loader from "components/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import PhotoGrid from "components/PhotoGrid";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useInfiniteQuery, InfiniteData } from "react-query";
import useFetchCategoryPhotos from "../hooks/useFetchCategories";
import { getCategories } from "../api/axios";
import { topicsAtom } from "../atoms/postsAtom";
import axios from "../api/axios";
import { IPhoto } from "../shared/IPhoto";

const Topicpage = () => {
  const topic = useAtomValue(topicsAtom);
  const [posts, setPosts] = useState<any>([]);

  const { data, isError, error, isLoading } = useQuery<IPhoto[], Error>(
    ["categories", topic],
    async () => getCategories(topic),
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      enabled: !!topic,
    }
  );

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
        <PhotoGrid posts={data} />
      </div>
    </>
  );
};

export default Topicpage;
