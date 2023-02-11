import { useInfiniteQuery } from "react-query";
import axios from "../api/axios";
import { useState } from "react";
import { useAtomValue, useAtom } from "jotai";
import { postsAtom } from "atoms/postsAtom";
import { topicAtom } from "atoms/topicAtom";
import { IInfinitePage } from "../shared/InfinitePage";

export default function useFetchCategoryPhotos() {
  const topic = useAtomValue(topicAtom);
  const [posts, setPosts] = useAtom(postsAtom);
  const [photos, setPhotos] = useState([]);

  const fetchCategoryPhotos = async () => {
    const resp = await axios.get(
      `topics/${topic}/photos&order_by=latest&per_page=30`
    );
    return resp.data;
  };

  const {
    data,
    status,
    error,
    isError,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<IInfinitePage, Error>(
    ["categories"],
    fetchCategoryPhotos,
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
      keepPreviousData: false,
      enabled: Boolean(topic),
    }
  );

  return {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
  };
}
