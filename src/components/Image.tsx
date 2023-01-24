import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { MouseEventHandler, useState } from "react";
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
      className="py-4 w-fit space-x-2 cursor-pointer relative hover:drop-shadow-2xl shadow-slate-50 transition-all duration-300 delay-75 hover:scale-105 hover:translate-2 overflow-hidden "
    >
      {isOpen && <Modal setIsOpen={setIsOpen} post={post} isOpen={isOpen} />}
      <LazyLoadImage
        effect="blur"
        className="rounded-lg "
        src={post.urls?.regular}
        alt={post.alt_description}
      />
      <div className=" absolute min-w-full bg-slate-50">
        <div className="text-slate-50 sm:text-md font-normal absolute bottom-5 left-5 whitespace-nowrap">
          {post.user.username}
        </div>
      </div>
    </div>
  );
};

export default Image;
