import { useQuery, useInfiniteQuery, useIsFetching } from "react-query";
import axios from "../api/axios";
import { useAtom, useSetAtom, useAtomValue } from "jotai";
import { queryAtom, postsAtom } from "../atoms/postsAtom";
import { useEffect, useState } from "react";

export default function useSearchPost() {
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
    return {
      data: resp.data,
      nextPage: pageParam + 1,
    };
  };

  return useInfiniteQuery(
    ["search_posts", query],
    async () => searchPost({ query: query[0] }),
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
      enabled: Boolean(query),
      select: (data) => {
        const flatten = data.pages
          .flatMap((page) => page.data)
          .flatMap((res) => res.results);
        return flatten;
      },
    }
  );
}
