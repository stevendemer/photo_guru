import { useInfiniteQuery } from "react-query";
import { useAtom } from "jotai";
import { postsAtom } from "../atoms/postsAtom";
import { useEffect } from "react";

export default function useQueryWithAxios(queryKey: string, queryFn: Function) {
  const [posts, setPosts] = useAtom(postsAtom);
  const { data, error, status, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery([queryKey], async () => queryFn(), {
      refetchOnMount: false,
      refetchOnWindowFocus: true,
      keepPreviousData: false,
    });

  useEffect(() => {
    if (data) {
      const result = data.pages.flatMap((page) => page.data);
      setPosts(result);
    }
  }, [data]);

  return {
    posts,
    setPosts,
    status,
    error,
    isFetchingNextPage,
    HashChangeEvent,
    fetchNextPage,
  };
}
