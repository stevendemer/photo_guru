import PhotoGrid from "components/PhotoGrid";
import { IPhoto } from "shared/IPhoto";
import Image from "components/Image";
import React, { useEffect, UIEvent, useCallback, useRef } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { postAdded } from "features/postsSlice";
import { useAppDispatch, useAppSelector } from "../store";
import useFetchPosts from "hooks/useFetchPosts";

const Homepage = () => {
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector((state) => state.posts);

  const {
    data,
    isLoading,
    isError,
    isSuccess,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useFetchPosts();

  const flattenData = data?.pages.flatMap((page) => page.data);

  const loadNext = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    if (isSuccess) {
    }
  }, [isSuccess, dispatch]);

  // useEffect(() => {
  //   let fetching = false;
  //   const handleScroll = async (e: any) => {
  //     const scrollHeight = e.currentTarget.scrollHeight;
  //     const clientHeight = e.currentTarget.clientHeight;
  //     const scrollTop = e.currentTarget.scrollTop;
  //     if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
  //       fetching = true;
  //       if (hasNextPage) await fetchNextPage();
  //       fetching = false;
  //     }
  //   };
  //   document.addEventListener("scroll", handleScroll);
  //   return () => document.removeEventListener("scroll", handleScroll);
  // }, [fetchNextPage, hasNextPage]);

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
        {flattenData?.map((post, idx) => (
          <div
            className="py-4 px-2 min-w-full last:mb-0 last:pb-0"
            key={post.id}
          >
            <Image
              author={post.user?.name}
              url={post.urls?.regular}
              alt={post.alt_description}
            />
          </div>
        ))}
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load more"
            : "Nothing more to load"}
        </button>
      </PhotoGrid>
    </div>
  );

  // return (
  //   <div className="px-4 py-8 sm:w-full">
  //     <PhotoGrid>
  //       {isSuccess &&
  //         data?.pages.map((group, idx) => (
  //           <React.Fragment key={idx}>
  //             {group.map((post: IPhoto) => (
  //               <div
  //                 className="py-4 px-2 min-w-full last:mb-0 last:pb-0"
  //                 key={post.id}
  //               >
  //                 <Image
  //                   author={post.user.name}
  //                   url={post.urls?.regular}
  //                   alt={post.alt_description}
  //                 />
  //               </div>
  //             ))}
  //           </React.Fragment>
  //         ))}
  //     </PhotoGrid>
  //   </div>
  // );
};

export default Homepage;
