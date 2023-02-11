import { useInfiniteQuery } from "react-query";
import axios from "../api/axios";
import { useAtomValue } from "jotai";
import { queryAtom } from "atoms/queryAtom";

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
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
      staleTime: 200 * 1000,
      cacheTime: 10000,
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
