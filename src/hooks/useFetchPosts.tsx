import { useQuery, useInfiniteQuery } from "react-query";
import axios from "../utils/axios";
import { IPhoto } from "shared/IPhoto";
import { useAtom, useSetAtom } from "jotai";
import { postsAtom } from "../atoms/postsAtom";
import { useEffect } from "react";

export default function useFetchPosts() {
  const setPosts = useSetAtom(postsAtom);

  const getPosts = async ({ pageParam = 1 }) => {
    const resp = await axios.get(`photos?page=${pageParam}&per_page=30`);
    return {
      data: resp.data,
      nextPage: pageParam + 1,
    };
  };
  const {
    data,
    error,
    status,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery(["posts"], getPosts, {
    refetchOnMount: false,
    keepPreviousData: false,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    retry: false,
  });

  useEffect(() => {
    if (data) {
      const flattenData = data.pages.flatMap((page) => page.data);
      setPosts(flattenData);
    }
  }, [data]);

  return {
    setPosts,
    error,
    status,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
