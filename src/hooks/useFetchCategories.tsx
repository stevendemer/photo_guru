import { useQuery } from "react-query";
import axios from "../api/axios";
import { useAtomValue } from "jotai";
import { topicAtom } from "atoms/topicAtom";

export default function useFetchCategoryPhotos() {
  const topic = useAtomValue(topicAtom);

  return useQuery(
    ["categories"],
    async ({ pageParam = 1 }) => {
      const resp = await axios.get(
        `topics/${topic}/photos?page=${pageParam}&per_page=25`
      );
      return resp.data;
    },
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      keepPreviousData: false,
      enabled: Boolean(topic),
    }
  );
}
