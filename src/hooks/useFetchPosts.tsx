import { useQuery, useInfiniteQuery } from "react-query";
import axios from "../utils/axios";
import { IPhoto } from "shared/IPhoto";

// Fetch 20 posts from each page and after
// every API call increment the page param

export default function useFetchPosts() {
  const getPosts = async ({ pageParam = 20 }) => {
    const resp = await axios.get(`photos?page=1&per_page=${pageParam}`);
    return {
      data: resp.data,
      nextPage: pageParam + 10,
    };
  };
  return useInfiniteQuery(["posts"], getPosts, {
    refetchOnMount: false,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
  });
}
