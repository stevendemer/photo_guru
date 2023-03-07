import { useInfiniteQuery } from "react-query";
import axios from "../api/axios";
import { useAtomValue } from "jotai";
import { topicAtom } from "atoms/topicAtom";

export default function useFetchCategoryPhotos() {
  const topic = useAtomValue(topicAtom);

  return useInfiniteQuery<any, Error>(
    ["categories"],
    async ({ pageParam = 1 }) => {
      const resp = await axios.get(
        `topics/${topic}/photos?page=${pageParam}&per_page=25`
      );
      return {
        data: resp.data,
        nextPage: pageParam + 1,
      };
    },
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      keepPreviousData: false,
      enabled: Boolean(topic),
      onSuccess: (data) => console.log("Data is ", data),
      onError: (error) => console.log(error),
    }
  );
}
