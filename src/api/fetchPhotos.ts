import { IPhoto } from "shared/IPhoto";
import axios from "./axios";
import { AxiosError } from "axios";
import { QueryFunction, QueryFunctionContext } from "react-query";

type Params = {
  queryKey: [string, {}];
};

export const fetchInfinitePosts = async ({
  pageParam = 1,
}): Promise<IPhoto[]> => {
  const resp = await axios.get(`photos?page=${pageParam}&per_page=25`);
  return resp.data;
};

export const fetchPostById = async (id: number): Promise<IPhoto[]> => {
  const resp = await axios.get(`photos/${id}`);
  return resp.data;
};

export const searchPhoto = async ({
  query,
  pageParam = 1,
}: {
  query: string;
  pageParam: number;
}): Promise<IPhoto[]> => {
  const resp = await axios.get(
    `search/photos/?query=${query}&page=${pageParam}&per_page=30`
  );
  return resp.data;
};

export const getProfile = async (username: string): Promise<any> => {
  const resp = await axios.get(`users/${username}`);
};

export const fetchRandom = async (): Promise<any> => {
  const resp = await axios.get("photos/random");
  return resp.data;
};

export const fetchTopics = async (): Promise<any> => {
  const resp = await axios.get("topics/?per_page=10");
  return resp.data;
};
