import { toast } from "react-toastify";
import {
  useInfiniteQuery,
  useQueryClient,
  useQuery,
  InfiniteData,
} from "react-query";
import axios from "../api/axios";
import { IPhoto } from "../shared/IPhoto";

export default function useFetchPosts() {
  const queryClient = useQueryClient();

  return useInfiniteQuery(
    ["posts"],
    async ({ pageParam = 1 }) => {
      const resp = await axios.get(
        `photos?page=${pageParam}&per_page=25&order_by=latest`
      );
      return {
        data: resp.data,
        nextPage: pageParam + 1,
      };
    },
    {
      keepPreviousData: false,
      getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
      select: (data: any) => data?.pages.flatMap((page: any) => page.data),
      staleTime: 50000,
      onError: (err: Error) =>
        toast.error(`Something went wrong ${err.message}`),
    }
  );
}
