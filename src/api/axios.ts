import axios from "axios";
import { IPhoto } from "../shared/IPhoto";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
  validateStatus: (status) => status === 200,
  params: {
    client_id: import.meta.env.VITE_ACCESS_KEY,
  },
  headers: {
    "Content-Type": "application/json",
  },
});

export const getPosts = async () => {
  const resp = await instance.get<IPhoto[]>(
    `photos/?page=1&per_page=30&order_by=popular`
  );
  return resp.data;
};

export const getCategories = async (category?: string) => {
  const resp = await instance.get(`topics/${category}/photos?per_page=40`);
  console.log("resp data is", resp.data);
  return resp.data;
};

export const getSearchPhotos = async (
  pageParam = 1,
  q: string,
  options = {}
) => {
  const resp = await instance.get<IPhoto[]>(
    `search/photos/?query=${q}&page=${pageParam}`,
    options
  );
  return resp.data;
};

export default instance;
