import { useQuery, useInfiniteQuery } from "react-query";
import axios from "../utils/axios";
import { IPhoto } from "shared/IPhoto";
import { useAtom, useSetAtom } from "jotai";
import { postsAtom } from "../atoms/postsAtom";
import { useEffect } from "react";

export default function useFetchPosts() {
  const setPosts = useSetAtom(postsAtom);

  const getPosts = async ({ pageParam = 1, perPage = 10 }) => {
    const resp = await axios.get(
      `photos?page=${pageParam}&per_page=${perPage}&order_by=popular`
    );
    return {
      data: resp.data,
      nextPage: pageParam + 1,
      perPage: perPage + 10,
    };
  };
  const {
    data,
    error,
    status,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery(["posts"], getPosts, {
    refetchOnMount: false,
    keepPreviousData: false,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      const flattenData = data.pages.flatMap((page) => page.data);
      setPosts(flattenData);
    }
  }, [data]);

  return {
    setPosts,
    error,
    status,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
