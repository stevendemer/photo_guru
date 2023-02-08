import { toast } from "react-toastify";
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
      `search/photos?page=${pageParam}&per_page=30&query=${query}`
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
      select: (data: any) => {
        const flatten = data.pages
          .flatMap((page: any) => page.data)
          .flatMap((res: any) => res.results);
        return flatten;
      },
    }
  );
}
