import PhotoGrid from "components/PhotoGrid";
import { fetchPhotos } from "utils/fetchPhotos";
import { useInfiniteQuery, useQuery } from "react-query";
import { IPhoto } from "shared/IPhoto";
import Image from "components/Image";
import { useStore } from "../photoStore";
import React, { useEffect, UIEvent, useCallback, useRef } from "react";
import InfiniteScroll from "react-infinite-scroller";

const Homepage = () => {
  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    error,
    isSuccess,
  } = useInfiniteQuery(
    ["photos"],
    ({ pageParam = 1 }) => fetchPhotos(pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.nextPage < lastPage.totalPages) return lastPage.nextPage;
        return undefined;
      },
    }
  );

  useEffect(() => {
    let fetching = false;
    const handleScroll = async (e: any) => {
      const scrollHeight = e.currentTarget.scrollHeight;
      const clientHeight = e.currentTarget.clientHeight;
      const scrollTop = e.currentTarget.scrollTop;
      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage]);

  if (isFetchingNextPage) {
    return <div>Loading more...</div>;
  }

  if (status === "error") {
    return (
      <div className="text-xl text-red-500 flex justify-center space-y-4">
        {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="px-4 py-8 sm:w-full">
      <PhotoGrid>
        {isSuccess &&
          data?.pages.map((group, idx) => (
            <React.Fragment key={idx}>
              {group.map((post) => (
                <div className="py-4 px-2 min-w-full " key={post.id}>
                  <Image
                    author={post.user.name}
                    url={post.urls?.regular}
                    alt={post.alt_description}
                  />
                </div>
              ))}
            </React.Fragment>
          ))}
      </PhotoGrid>
    </div>
  );
};

export default Homepage;
