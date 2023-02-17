import { SyntheticEvent, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useState } from "react";
import Modal from "./Modal";
import { IPhoto } from "shared/IPhoto";
import "react-lazy-load-image-component/src/effects/blur.css";

const Image = ({ post }: { post: IPhoto }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="py-2 space-x-2 cursor-pointer relative hover:drop-shadow-2xl shadow-slate-50 transition-all duration-300 delay-75 hover:scale-105 hover:translate-2  drop-shadow-xl">
      <LazyLoadImage
        onClick={() => setIsOpen(true)}
        className="rounded-lg aspect-auto "
        src={post?.urls?.regular}
        alt="photo alt"
        effect="blur"
      />
      {isOpen &&
        createPortal(
          <div className="md:px-20 lg:px-28 pb-4 pointer-events-none overflow-auto ">
            <Modal isOpen={isOpen} onToggle={() => onToggle()} post={post} />
          </div>,
          document.body
        )}
    </div>
  );
};

export default Image;
