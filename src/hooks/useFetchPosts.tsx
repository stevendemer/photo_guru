// @ts-nocheck
import { toast } from "react-toastify";
import { useInfiniteQuery } from "react-query";
import axios from "../api/axios";
import { IInfinitePage } from "../shared/InfinitePage";
import { IPhoto } from "../shared/IPhoto";

export default function useFetchPosts() {
  const getPosts = async ({ page = 1 }) => {
    const resp = await axios.get(
      `photos?page=${page}&per_page=25&order_by=popular`
    );
    return {
      data: resp.data as IPhoto[],
      nextPage: page + 1,
    };
  };
  return useInfiniteQuery(["posts"], getPosts, {
    refetchOnWindowFocus: true,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    select: (data) => data?.pages.flatMap((page: any) => page.data),
    staleTime: 4000,
  });
}
