import { useQuery, useInfiniteQuery } from "react-query";
import axios from "../api/axios";
import { IPhoto } from "shared/IPhoto";
import { useAtom, useSetAtom } from "jotai";
import { postsAtom } from "../atoms/postsAtom";
import { useEffect, useState } from "react";

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
  } = useInfiniteQuery(["posts"], getPosts, {
    refetchOnMount: false,
    keepPreviousData: false,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    select: (data) => data.pages.flatMap((page) => page.data),
  });

  useEffect(() => {
    if (data) {
      setPosts(data);
    }
  }, [data]);

  return {
    posts,
    setPosts,
    error,
    status,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
