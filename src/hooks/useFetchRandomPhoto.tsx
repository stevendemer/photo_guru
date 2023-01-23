import { IPhoto } from "shared/IPhoto";
import axios from "../utils/axios";
import { useQuery } from "react-query";

export default function useFetchRandomPhoto() {
  const fetchPhoto = async () => {
    const resp = await axios.get("photos/random");
    return resp.data;
  };

  return useQuery<IPhoto, Error>(["random_photo"], fetchPhoto, {
    refetchOnMount: false,
  });
}
