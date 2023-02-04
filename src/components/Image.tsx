import { forwardRef } from "react";
import { createPortal } from "react-dom";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useState } from "react";
import Modal from "./Modal";
import { IPhoto } from "shared/IPhoto";

const Image = ({ post }: { post: IPhoto }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="py-4 space-x-2 cursor-pointer relative hover:drop-shadow-2xl shadow-slate-50 transition-all duration-300 delay-75 hover:scale-105 hover:translate-2 overflow-hidden drop-shadow-xl">
      <LazyLoadImage
        onClick={onClick}
        effect="opacity"
        className="rounded-lg max-w-full aspect-auto"
        src={post?.urls?.regular}
        alt={post?.alt_description}
      />
      {isOpen &&
        createPortal(
          <div
            onBlur={onClick}
            className="md:px-20 lg:px-28 pb-4 cursor-auto pointer-events-none overflow-x-hidden overflow-y-auto"
          >
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} post={post} />
          </div>,
          document.body
        )}
    </div>
  );
};

export default Image;
