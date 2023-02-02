import { useInfiniteQuery } from "react-query";
import axios from "../api/axios";
import { postsAtom } from "../atoms/postsAtom";
import { useEffect, useState, useMemo } from "react";

export default function useFetchPosts() {
  const getPosts = async ({ pageParam = 1 }) => {
    const resp = await axios.get(
      `photos?page=${pageParam}&per_page=30&order_by=popular`
    );
    return {
      data: resp.data,
      nextPage: pageParam + 1,
    };
  };
  return useInfiniteQuery(["posts"], getPosts, {
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    select: (data) => data?.pages.flatMap((page) => page.data),
  });
}
