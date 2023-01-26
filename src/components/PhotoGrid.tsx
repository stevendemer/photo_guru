import { ForwardedRef, ReactNode, forwardRef } from "react";
import Image from "./Image";
import { IPhoto } from "shared/IPhoto";
import { useAtomValue } from "jotai";
import { postsAtom, queryAtom } from "../atoms/postsAtom";

type IProps = {
  children?: ReactNode;
};

const PhotoGrid = forwardRef<HTMLInputElement, IProps>(function PhotoGrid(
  props: IProps,
  ref
) {
  const { children } = props;
  const posts = useAtomValue(postsAtom);
  const query = useAtomValue(queryAtom);

  console.log(posts);
  console.log(query);

  const renderPosts = posts.map((post, idx) => {
    return (
      <div className="py-4 px-2 min-w-full last:mb-0 last:pb-0" key={idx}>
        <Image post={post} />
      </div>
    );
  });

  const hasContent = posts.length ? (
    renderPosts
  ) : (
    <div className="relative">
      <div className="flex justify-center items-center text-xl text-gray-400 font-bold">
        No posts found !
      </div>
    </div>
  );

  return (
    <div className="masonry sm:masonry-sm md:masonry-md mx-4">{hasContent}</div>
  );
});

export default PhotoGrid;
