import { toast } from "react-toastify";
import { useInfiniteQuery } from "react-query";
import axios from "../api/axios";
import { IPhoto } from "../shared/IPhoto";

export default function useFetchPosts() {
  return useInfiniteQuery(
    ["posts"],
    async ({ pageParam = 1 }) => {
      const resp = await axios.get(
        `photos?page=${pageParam}&per_page=30&order_by=popular`
      );
      return {
        data: resp.data as IPhoto[],
        nextPage: pageParam + 1,
      };
    },
    {
      refetchOnWindowFocus: true,
      keepPreviousData: false,
      getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
      select: (data) => data?.pages.flatMap((page: any) => page.data),
      staleTime: 5000,
      onError: (err: Error) =>
        toast.error(`Something went wrong ${err.message}`),
    }
  );
}
