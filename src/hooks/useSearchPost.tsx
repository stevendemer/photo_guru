import { useInfiniteQuery } from "react-query";
import axios from "../api/axios";
import { useAtomValue } from "jotai";
import { queryAtom } from "atoms/queryAtom";

export default function useSearchPost() {
  const queries = useAtomValue(queryAtom);

  return useInfiniteQuery(
    ["search_posts", queries],
    async ({ pageParam = 1 }) => {
      if (queries.length > 0) {
        const resp = await axios.get(
          `search/photos?page=${pageParam}&per_page=25&query=${queries[0]}`
        );
        return {
          data: resp.data,
          nextPage: pageParam + 1,
        };
      }
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: true,
      getNextPageParam: (lastPage) => lastPage?.nextPage ?? undefined,
      cacheTime: 40000,
      enabled: queries.length > 0,
      select: (data: any) => {
        const flatten = data.pages
          .flatMap((page: any) => page.data)
          .flatMap((res: any) => res.results);
        return flatten;
      },
    }
  );
}
