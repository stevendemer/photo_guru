import { useQuery, useInfiniteQuery, useIsFetching } from "react-query";
import axios from "../utils/axios";
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
      `search/photos?page=${pageParam}&query=${query}`
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
        refetchOnMount: false,
        refetchOnWindowFocus: true,
        getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
        enabled: !!query,
        keepPreviousData: false,
      }
    );

  useEffect(() => {
    if (data) {
      const flattenData = data.pages.flatMap((page) => page.data);
      const finalData = flattenData.flatMap((res) => res.results);
      setPosts(finalData);
    }
  }, [data]);

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
