import { useQuery } from "react-query";
import axios from "../api/axios";
import { IPhoto } from "../shared/IPhoto";

export default function useFetchSinglePost(id: string) {
  const getSinglePost = async () => {
    const resp = await axios.get(`photos/${id}`);
    return resp.data;
  };

  return useQuery<IPhoto, Error>(["single_post", id], getSinglePost, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 6000 * 10,
    enabled: Boolean(id),
  });
}
