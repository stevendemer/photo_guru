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
    pageParam = 20,
    query = "",
  }: {
    pageParam?: number;
    query?: string;
  }) => {
    const resp = await axios.get(
      `search/photos?page=1&per_page=${pageParam}&query=${query}`
    );
    console.log("Inside axios ", query);
    return {
      data: resp.data,
      nextPage: pageParam + 10,
    };
  };

  const { data, status, error, hasNextPage, fetchNextPage, refetch } =
    useInfiniteQuery(
      ["search_posts", query],
      async () => searchPost({ query }),
      {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
        enabled: !!query,
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
