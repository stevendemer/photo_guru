import { useQuery, useInfiniteQuery } from "react-query";
import axios from "../api/axios";
import { useEffect, useState } from "react";
import { ITopic } from "../shared/ITopic";
import { useAtomValue, useAtom } from "jotai";
import { topicsAtom, postsAtom } from "../atoms/postsAtom";

export default function useFetchCategoryPhotos() {
  const topic = useAtomValue(topicsAtom);
  const [posts, setPosts] = useAtom(postsAtom);
  const [photos, setPhotos] = useState([]);

  const fetchCategoryPhotos = async ({ page = 1 }: { page?: number }) => {
    const resp = await axios.get(
      `topics/${topic?.slug}&page=${page}&per_page=30`
    );

    return {
      data: resp.data,
      nextPage: page + 1,
    };
  };

  const { data, status, error } = useInfiniteQuery(
    ["categories"],
    async () => fetchCategoryPhotos,
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
      keepPreviousData: false,
      enabled: Boolean(topic),
      select: (data) => data.map((d) => d.preview_photos),
    }
  );

  useEffect(() => {
    if (data) {
      setPhotos(data);
    }
    // setPosts(photos);
  }, [data]);

  return {
    photos,
    setPhotos,
    status,
    error,
  };
}
