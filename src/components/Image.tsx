import { SyntheticEvent } from "react";
import { createPortal } from "react-dom";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useState } from "react";
import Modal from "./Modal";
import { IPhoto } from "shared/IPhoto";
import useFetchSinglePost from "../hooks/useFetchPostID";

const Image = ({ post }: { post: IPhoto }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {
    data: result,
    isLoading,
    isError,
    error,
  } = useFetchSinglePost(post.id);

  const onClick = (e: SyntheticEvent) => {
    setIsOpen((prev) => !prev);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="py-4 space-x-2 cursor-pointer relative hover:drop-shadow-2xl shadow-slate-50 transition-all duration-300 delay-75 hover:scale-105 hover:translate-2 overflow-hidden drop-shadow-xl">
      <LazyLoadImage
        onClick={() => setIsOpen(true)}
        effect="opacity"
        className="rounded-lg  aspect-auto"
        src={post?.urls?.regular}
        alt={post?.alt_description}
      />
      {isOpen &&
        createPortal(
          <div
            onBlur={() => setIsOpen(false)}
            className="md:px-20 lg:px-28 pb-4 cursor-auto pointer-events-none"
          >
            <Modal
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              post={result}
            />
          </div>,
          document.body
        )}
    </div>
  );
};

export default Image;
