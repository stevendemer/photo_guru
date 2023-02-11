import Image from "./Image";
import { Dialog, Transition } from "@headlessui/react";
import {
  useState,
  ReactNode,
  useEffect,
  SyntheticEvent,
  Fragment,
} from "react";
import { IPhoto } from "../shared/IPhoto";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useClickOutside from "../hooks/useClickOutside";

const Modal = ({
  onClose,
  isOpen,
  post,
}: {
  onClose: (x: boolean) => void;
  isOpen: boolean;
  post: IPhoto;
}) => {
  const { ref, isVisible, setIsVisible } = useClickOutside(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // close the modal when Esc is pressed
  useEffect(() => {
    function handleEsc(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose(false);
      }
    }
    document.addEventListener("keydown", handleEsc);

    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <Transition as={Fragment} show={isOpen}>
      <div
        ref={ref}
        className="z-50 fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="sm:h-[calc(100%-3rem)] w-full my-6 mx-auto relative pointer-events-none">
          <div className="max-h-full min-w-[90vw] max-w-screen-lg  overflow-hidden border-none shadow-lg absolute left-1/2 -translate-x-1/2 flex flex-col pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="flex flex-shrink-0 items-center p-4 border-b border-gray-200 rounded-t-md dark:bg-black dark:text-slate-50">
              <div className="flex ml-10 mr-20 items-center w-auto bg-purple-700  p-2 rounded-full cursor-pointer border-2 border-white hover:border-gray-500 transition-all duration-200">
                <div className="leading-8 text-center text-lg sm:text-md text-slate-50 font-regular mx-2 ">
                  {post.user.name}
                </div>
                <img
                  className="rounded-full w-8 h-8 mx-4 "
                  src={post.user.profile_image?.small}
                  alt="profile image"
                />
              </div>

              <h2 className="text-xl font-normal capitalize leading-normal text-gray-800">
                {post.alt_description}
              </h2>
            </div>
            <div className="flex-auto  overflow-y-auto relative top-2 p-4 w-full">
              <img
                className="min-w-fit max-w-screen-md object-center max-h-full rounded-lg object-contain mx-auto"
                src={post.urls?.regular}
                alt="selected photo"
              />
              <div className="flex flex-shrink-0 items-center p-4">
                <h2 className="text-xl text-black/50 ">
                  Likes <span className="text-black mx-4">{post.likes}</span>
                </h2>
                <h2 className="text-xl text-black/50 ">
                  Downloads{" "}
                  <span className="text-black mx-4">{post.downloads}</span>
                </h2>
              </div>
            </div>
            <div className="flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
              <button
                type="button"
                className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                data-bs-dismiss="modal"
                onClick={() => onClose(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};
export default Modal;
