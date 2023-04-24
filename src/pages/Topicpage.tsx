import { useEffect, useState } from "react";
import { useQuery, useInfiniteQuery, InfiniteData } from "react-query";
import { topicAtom } from "atoms/topicAtom";
import { useAtomValue } from "jotai";
import { IPhoto } from "shared/IPhoto";
import { getCategories } from "api/axios";
import PhotoMasonry from "components/PhotoMasonry";

const Topicpage = () => {
  const topic = useAtomValue(topicAtom);
  const {
    data: posts,
    isError,
    error,
    isLoading,
  } = useQuery<IPhoto[], Error>(
    ["categories", topic],
    async () => getCategories(topic),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: true,
      enabled: !!topic,
      onSuccess: (data) => console.log("Data is ", data),
    }
  );

  // console.log("Data from categories", posts);

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
        <PhotoMasonry isLoading={isLoading} posts={posts} />
      </div>
    </>
  );
};

export default Topicpage;
