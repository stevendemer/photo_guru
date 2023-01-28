import { useQuery, useInfiniteQuery } from "react-query";
import axios from "../api/axios";
import { useEffect, useState } from "react";
import { ITopic } from "../shared/ITopic";

export default function useFetchCategoryPhotos(category?: string) {
  const fetchCategoryPhotos = async ({ page = 1 }: { page?: number }) => {
    const resp = await axios.get(`topics/${category}?page=${page}`);

    return {
      data: resp.data,
      nextPage: page + 1,
    };
  };
  return useInfiniteQuery(["categories"], async () => fetchCategoryPhotos, {
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    keepPreviousData: false,
    enabled: Boolean(category),
  });
}
