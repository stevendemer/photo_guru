import { IPhoto } from "shared/IPhoto";
import axios from "./axios";
import { AxiosError } from "axios";

export const fetchPhotos = async (): Promise<any> => {
  const resp = await axios.get(`photos?page=1&per_page=30`);
  return resp.data;
};

export const fetchPhotoById = async (id: number | string): Promise<any> => {
  const resp = await axios.get(`photos/${id}`);
  return resp.data;
};

export const searchPhoto = async (query: string | undefined): Promise<any> => {
  const resp = await axios.get(
    `search/photos/?query=${query}&page=1&per_page=30`
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
