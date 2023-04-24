import { createPortal } from "react-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useState } from "react";
import Modal from "./Modal";
import { IPhoto } from "shared/IPhoto";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";

const Image = ({ post }: { post: IPhoto }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const navigate = useNavigate();

  // change brightness and show username after 200ms to avoid flickering
  const debounceHandler = debounce(() => setHovered(true), 100);

  const onToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const onMouseLeave = () => {
    setHovered(false);
    debounceHandler.cancel();
  };

  return (
    <div className="py-4 px-2 cursor-pointer transition-all duration-150 delay-75 relative  hover:drop-shadow-2xl shadow-slate-50 hover:scale-105 hover:translate-2 drop-shadow-xl">
      <div className="relative container">
        {hovered && (
          <div className="w-full z-50 absolute left-4 bottom-4 text-slate-50 ">
            {post.user.name}{" "}
          </div>
        )}
        <LazyLoadImage
          onMouseEnter={debounceHandler}
          onMouseLeave={onMouseLeave}
          onClick={() => setIsOpen(true)}
          className={`rounded-lg aspect-auto h-auto max-w-full brightness-75 ${
            hovered && "brightness-90"
          }`}
          src={post?.urls?.raw + "&w=400&h=400&fit=crop"}
          alt="photo alt"
          effect="blur"
        />
      </div>
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
