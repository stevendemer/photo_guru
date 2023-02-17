import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import PhotoGrid from "components/PhotoGrid";
import { useQuery, useInfiniteQuery, InfiniteData } from "react-query";
import { getCategories } from "../api/axios";
import { topicAtom } from "atoms/topicAtom";
import useFetchCategoryPhotos from "../hooks/useFetchCategories";
import Loader from "components/Loader";

const Topicpage = () => {
  const { data, isLoading, error, isError } = useFetchCategoryPhotos();

  console.log("Data from categories", data);

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
