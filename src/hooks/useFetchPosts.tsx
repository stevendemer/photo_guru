import { useQuery, useInfiniteQuery } from "react-query";
import axios from "../api/axios";
import { IPhoto } from "shared/IPhoto";
import { useAtom, useSetAtom } from "jotai";
import { postsAtom } from "../atoms/postsAtom";
import { useEffect, useState, useMemo } from "react";

export default function useFetchPosts() {
  const [posts, setPosts] = useAtom(postsAtom);

  const getPosts = async ({ pageParam = 1 }) => {
    const resp = await axios.get(
      `photos?page=${pageParam}&per_page=30&order_by=popular`
    );
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
    refetch,
  } = useInfiniteQuery(["posts"], getPosts, {
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    select: (data) => data.pages.flatMap((page) => page.data),
    staleTime: 0,
    cacheTime: 0,
  });

  useMemo(() => {
    if (!data) return [];
    setPosts(data);
  }, [data]);

  return {
    posts,
    data,
    setPosts,
    error,
    status,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
