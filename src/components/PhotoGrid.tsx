import { memo, ReactNode, forwardRef } from "react";
import Image from "./Image";
import { IPhoto } from "shared/IPhoto";
import { postsAtom } from "../atoms/postsAtom";
import { queryAtom } from "atoms/queryAtom";
import ImageSkeleton from "./ImageSkeleton";

type IProps = {
  posts: IPhoto[] | undefined;
  isLoading: boolean;
};

const PhotoGrid = memo((props: IProps) => {
  const { posts, isLoading } = props;

  const renderPosts = posts?.map((post, idx) => {
    return (
      <div className="py-4 px-2 min-w-full last:mb-0 last:pb-0" key={idx}>
        {isLoading && <ImageSkeleton images={posts.length} />}
        <Image post={post} />
      </div>
    );
  });

  const hasContent =
    posts && posts.length > 0 ? (
      renderPosts
    ) : (
      <div className="relative">
        <div className="flex justify-center items-center text-xl text-gray-400 font-bold">
          No posts found !
        </div>
      </div>
    );

  return <div className="columns-1 gap-8 md:columns-3 ">{hasContent}</div>;
});

export default PhotoGrid;
