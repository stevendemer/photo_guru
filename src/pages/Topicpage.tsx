import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import PhotoGrid from "components/PhotoGrid";
import { useQuery, useInfiniteQuery, InfiniteData } from "react-query";
import { getCategories } from "../api/axios";
import { topicAtom } from "atoms/topicAtom";
import useFetchCategoryPhotos from "../hooks/useFetchCategories";
import Loader from "components/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const Topicpage = () => {
  const {
    data: topics,
    isLoading,
    error,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useFetchCategoryPhotos();

  console.log("Data from categories", topics);

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
        <InfiniteScroll
          dataLength={topics.length}
          loader={<div>Loading...</div>}
          next={() => fetchNextPage()}
        >
          <PhotoGrid isLoading={isLoading} posts={topics} />
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Topicpage;
