import { forwardRef } from "react";
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
    <div
      onClick={() => onClick()}
      className="py-4 space-x-2 cursor-pointer relative hover:drop-shadow-2xl shadow-slate-50 transition-all duration-300 delay-75 hover:scale-105 hover:translate-2 overflow-hidden "
    >
      <LazyLoadImage
        effect="blur"
        className="rounded-lg w-fit"
        src={post?.urls?.regular}
        alt={post?.alt_description}
      />
      {isOpen && <Modal setIsOpen={setIsOpen} post={post} isOpen={isOpen} />}
    </div>
  );
};

export default Image;
