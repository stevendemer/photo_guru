import { toast } from "react-toastify";
import {
  useInfiniteQuery,
  useQueryClient,
  InfiniteData,
  QueryFunctionContext,
} from "react-query";
import axios from "../api/axios";
import { IPhoto } from "../shared/IPhoto";
import { useMemo, useCallback } from "react";

interface IResult {
  data: IPhoto[];
}

export default function useGetInfinitePhotos(key: [string]) {
  return useInfiniteQuery(
    key,
    async ({ pageParam = 1 }) => {
      const { data } = await axios.get(`photos?page=${pageParam}&per_page=25`);
      return {
        data,
        nextPage: pageParam + 1,
      };
    },
    {
      keepPreviousData: true,
      retry: false,
      retryOnMount: false,
      getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
      select: useCallback(
        (data: InfiniteData<IPhoto[]>): IPhoto[] =>
          data.pages.flatMap((value: any) => value.data),
        []
      ),
      onError: (err: Error) =>
        toast.error(`Something went wrong ${err.message}`),
    }
  );
}
