import { useInfiniteQuery } from "react-query";
import axios from "../api/axios";
import { useAtomValue } from "jotai";
import { queryAtom } from "atoms/queryAtom";

export default function useSearchPost() {
  const query = useAtomValue(queryAtom);

  const searchPost = async ({ pageParam = 1 }: { pageParam?: number }) => {
    if (query !== undefined) {
      const resp = await axios.get(
        `search/photos?page=${pageParam}&per_page=30&query=${query[0]}`
      );
      return {
        data: resp.data,
        nextPage: pageParam + 1,
      };
    }
  };

  return useInfiniteQuery(["search_posts", query], searchPost, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    cacheTime: 90000,
    enabled: Boolean(query),
    select: (data: any) => {
      const flatten = data.pages
        .flatMap((page: any) => page.data)
        .flatMap((res: any) => res.results);
      return flatten;
    },
  });
}
