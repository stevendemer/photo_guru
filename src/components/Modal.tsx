import Image from "./Image";
import { Transition } from "@headlessui/react";
import { useState, useEffect, Fragment } from "react";
import { IPhoto } from "../shared/IPhoto";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useClickOutside from "../hooks/useClickOutside";
import { IoCloseOutline } from "react-icons/io5";
import useFetchSinglePost from "../hooks/useFetchPostID";

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

  const {
    data: result,
    isLoading,
    isError,
    error,
  } = useFetchSinglePost(post.id);

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

  // console.log("First tag is ", post?.tags[0].source.title);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <Transition as={Fragment} show={isOpen}>
      <div
        className="z-50 fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto backdrop-blur-sm backdrop-brightness-75 "
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="flex absolute flex-shrink-0 flex-wrap items-center p-4  border-t border-gray-200 rounded-b-md z-[999]">
          <button
            type="button"
            className="inline-block px-2  text-slate-200 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out z-[999]"
            data-bs-dismiss="modal"
            onClick={() => onClose(false)}
          >
            <IoCloseOutline className="w-10 h-10 text-slate-100" />
          </button>
        </div>

        <div className="sm:h-[calc(100%-3rem)] w-full my-6 mx-auto relative pointer-events-none">
          <div className="max-h-full min-w-[90vw] max-w-screen-lg  overflow-hidden border-none shadow-lg absolute left-1/2 -translate-x-1/2 flex flex-col pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="flex flex-shrink-0 items-center p-4 border-b border-gray-200 rounded-t-md dark:bg-black dark:text-slate-50">
              <div className="flex ml-10 mr-20 items-center w-auto bg-gradient-to-t from-indigo-400 to-blue-500  p-2 rounded-full cursor-pointer border-2 hover:border-slate-100 transition-all duration-200">
                <div className="leading-8 text-center text-lg sm:text-md text-slate-50 font-regular mx-2 ">
                  {result?.user.name}
                </div>
                <img
                  className="rounded-full w-8 h-8 mx-4 "
                  src={result?.user.profile_image?.small}
                  alt="profile image"
                />
              </div>
            </div>
            <div className="flex-auto  overflow-y-auto relative top-2 p-4 w-full">
              <img
                className="min-w-fit max-w-screen-md object-center max-h-full rounded-lg object-contain mx-auto"
                src={result?.urls?.regular}
                alt="selected photo"
              />
              <div className="flex flex-shrink-0 items-center p-4">
                <h2 className="text-xl text-black/50 ">
                  Likes <span className="text-black mx-4">{result?.likes}</span>
                </h2>
                <h2 className="text-xl text-black/50 ">
                  Downloads{" "}
                  <span className="text-black mx-4">{result?.downloads}</span>
                </h2>
                <h2 className="text-xl text-black/50 ">
                  Created at{" "}
                  <span className="text-black mx-4">
                    {result?.created_at?.split("-").join(" ").slice(0, 10)}
                  </span>
                </h2>
              </div>
              <h3 className="font-regular px-2 py-4 text-xl border-b-[1px] border-black m-2">
                Related Tags
              </h3>
              <div className="flex items-center mx-2 space-x-2 pt-2 overflow-x-hidden max-w-screen-2xl">
                {result?.tags.map((tag, idx) => (
                  <div
                    key={idx}
                    className="capitalize min-w-fit flex-wrap flex  text-black/70 hover:text-black bg-slate-200 p-2 mb-10 rounded-md cursor-pointer font-regular"
                  >
                    {tag.title}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};
export default Modal;
