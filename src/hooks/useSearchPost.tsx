import { useQuery, useInfiniteQuery, useIsFetching } from "react-query";
import axios from "../api/axios";
import { useAtom, useSetAtom, useAtomValue } from "jotai";
import { queryAtom, postsAtom } from "../atoms/postsAtom";
import { useEffect, useState } from "react";
import { IPhoto } from "../shared/IPhoto";

export default function useSearchPost() {
  const [posts, setPosts] = useAtom(postsAtom);
  const query = useAtomValue(queryAtom);

  const searchPost = async ({
    pageParam = 1,
    query = "",
  }: {
    pageParam?: number;
    query?: string;
  }) => {
    const resp = await axios.get(
      `search/photos/?query=${query}&page=${pageParam}&per_page=30`
    );
    console.log("Inside axios ", query);
    return {
      data: resp.data,
      nextPage: pageParam + 1,
    };
  };

  const { data, status, error, hasNextPage, fetchNextPage, refetch } =
    useInfiniteQuery(
      ["search_posts", query],
      async () => searchPost({ query }),
      {
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
        enabled: !!query,
        staleTime: 0,
        cacheTime: 0,
      }
    );

  useEffect(() => {
    if (data) {
      const flattenData = data.pages.flatMap((page) => page.data);
      const finalData = flattenData.flatMap((res) => res.results);
      setPosts(finalData);
      refetch();
    }
  }, [data, refetch]);

  console.log("query", query);

  return {
    posts,
    setPosts,
    error,
    refetch,
    status,
    hasNextPage,
    fetchNextPage,
  };
}
