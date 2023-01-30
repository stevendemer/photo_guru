import { useQuery, useInfiniteQuery } from "react-query";
import axios from "../api/axios";
import { useEffect, useState } from "react";
import { ITopic } from "../shared/ITopic";
import { useAtomValue, useAtom } from "jotai";
import { topicsAtom, postsAtom } from "../atoms/postsAtom";
import { IPhoto } from "../shared/IPhoto";

export default function useFetchCategoryPhotos() {
  const topic = useAtomValue(topicsAtom);
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
  } = useInfiniteQuery<IPhoto[], Error>(["categories"], fetchCategoryPhotos, {
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    keepPreviousData: false,
    enabled: Boolean(topic),
  });

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
