import { Dialog } from "@headlessui/react";
import { useEffect, Fragment, useRef } from "react";
import { IPhoto } from "../shared/IPhoto";
import { IoCloseOutline } from "react-icons/io5";
import useFetchSinglePost from "../hooks/useFetchPostID";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams, useLocation } from "react-router-dom";
import { useOnClickOutside } from "usehooks-ts";

const Modal = ({
  post,
  isOpen,
  onToggle,
}: {
  post: IPhoto;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const {
    data: result,
    isLoading,
    isError,
    error,
  } = useFetchSinglePost(post.id);
  // close the modal when Esc is pressed
  useEffect(() => {
    function handleEsc(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onToggle();
      }
    }
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  const container = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        duration: 0.2,
        type: "tween",
      },
    },
  };

  return (
    <AnimatePresence>
      <Dialog
        variants={container}
        static
        as={motion.div}
        onClose={onToggle}
        open={isOpen}
        initial="hidden"
        animate="show"
        ref={ref}
      >
        <div
          id="modal"
          className="z-50 fixed top-0 left-0 w-full h-full outline-none backdrop-blur-sm backdrop-brightness-75"
          tabIndex={-1}
          aria-hidden="true"
        >
          <button
            type="button"
            className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-prev
          >
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/10 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60  dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-slate-50 sm:w-6 sm:h-6 "
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-next
          >
            <span className="inline-flex  items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/10 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:outline-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-slate-50 sm:w-6 sm:h-6 0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>

          <div className="flex relative flex-shrink-0 flex-wrap items-center p-4  border-t border-gray-200 rounded-b-md z-50">
            <button
              type="button"
              className="inline-block px-2 text-slate-200 font-medium text-xs leading-4 uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
              data-bs-dismiss="modal"
              onClick={onToggle}
            >
              <IoCloseOutline className="w-10 h-10 text-slate-100 absolute z-[9999]" />
            </button>
          </div>

          <div className="sm:h-[calc(100%-3rem)] w-full my-6 mx-auto relative pointer-events-none ">
            <div className="max-h-full min-w-[90vw] max-w-screen-lg overflow-hidden border-none shadow-lg absolute left-1/2 -translate-x-1/2 flex flex-col pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
              <div className="flex flex-shrink-0 items-center p-4 border-b-2 border-gray-300 rounded-t-md dark:bg-slate-800 dark:text-slate-50">
                <div className="flex ml-10 mr-20 items-center w-auto bg-gradient-to-t from-indigo-400 to-blue-500 p-2 rounded-full cursor-pointer border-2 hover:border-slate-800 transition-all duration-200">
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
              <div className="overflow-y-auto relative top-0 p-4 dark:bg-slate-800 dark:text-slate-50">
                <img
                  className="rounded-xl mx-auto h-auto max-w-lg"
                  src={result?.urls?.regular}
                  alt="selected photo"
                />
                <div className="flex flex-shrink-0 items-center p-2 dark:text-slate-100 text-slate-800">
                  <h2 className="text-xl ">
                    Likes{" "}
                    <span className="mx-4 opacity-70 ">{result?.likes}</span>
                  </h2>
                  <h2 className="text-xl">
                    Downloads{" "}
                    <span className="mx-4 opacity-70">{result?.downloads}</span>
                  </h2>
                  <h2 className="text-xl ">
                    Created at{" "}
                    <span className=" mx-4 opacity-70">
                      {result?.created_at?.split("-").join(" ").slice(0, 10)}
                    </span>
                  </h2>
                </div>
                <h3 className="font-regular px-2 py-4 text-xl border-b-[1px] border-black m-2">
                  Related Tags
                </h3>
                <div className="w-full flex justify-center items-center mx-2 space-x-2 pt-2 overflow-hidden  max-w-screen-2xl">
                  {result?.tags.map((tag, idx) => (
                    <div
                      key={idx}
                      className="capitalize w-fit flex flex-wrap flex-shrink whitespace-nowrap text-slate-300 dark:text-slate-600 hover:text-slate-100 bg-gray-500 dark:bg-gray-200 px-4 py-2 mb-10 rounded-md cursor-pointer font-regular"
                    >
                      {tag.title}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </AnimatePresence>
  );
};
export default Modal;
