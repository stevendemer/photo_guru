import { useQuery } from "react-query";
import axios from "../utils/axios";

export default function useFetchCategories() {
  const getCategories = async () => {
    const resp = await axios.get("topics/?per_page=10");
    return resp.data;
  };
  return useQuery(["categories"], getCategories, { refetchOnMount: false });
}
