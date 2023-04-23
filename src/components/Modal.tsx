import { Dialog } from "@headlessui/react";
import { useEffect, useState, useRef } from "react";
import { IPhoto } from "../shared/IPhoto";
import { IoCloseOutline } from "react-icons/io5";
import useFetchSinglePost from "../hooks/useFetchPostID";
import { useOnClickOutside } from "usehooks-ts";
import ReactModal from "react-modal";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { motion } from "framer-motion";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

const Modal = ({
  post,
  isOpen,
  onToggle,
}: {
  post: IPhoto;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);

  // whenever the user clicks on the image, fetch the full image
  const [clicked, setClicked] = useState<boolean>(false);

  const query = useFetchSinglePost(post.id);

  useOnClickOutside(overlayRef, () => onToggle()); // close modal when clicked outside of it

  // disable scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // close the modal when Esc is pressed
  useEffect(() => {
    function handleEsc(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onToggle();
        setClicked(false);
      }
    }
    document.addEventListener("keydown", handleEsc, false);

    return () => {
      document.removeEventListener("keydown", handleEsc, false);
    };
  }, []);

  if (query.isError) {
    return <div>{query.error.message}</div>;
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
    <ReactModal
      isOpen={isOpen}
      contentLabel="Image modal"
      onRequestClose={onToggle}
      onAfterOpen={() => setClicked(true)}
    >
      <MotionConfig
        transition={{
          x: {
            type: "spring",
            stiffness: 300,
            damping: 30,
          },
          opacity: {
            duration: 0.4,
          },
        }}
      >
        <AnimatePresence>
          <Dialog
            variants={container}
            static
            as={motion.div}
            onClose={onToggle}
            open={isOpen}
            animate="show"
            initial="hidden"
          >
            <Dialog.Overlay
              ref={overlayRef}
              as={motion.div}
              className="fixed inset-0 z-30 bg-black/50 backdrop-blur-2xl"
            />
            <div
              id="modal"
              className="z-50 fixed top-0 left-0 w-full h-full outline-none backdrop-blur-xl backdrop-brightness-75"
              tabIndex={-1}
              aria-hidden="true"
            >
              <div className="flex relative flex-shrink-0 flex-wrap items-center p-4 border-t border-gray-200 rounded-b-md z-50">
                <button
                  type="button"
                  className="inline-block px-2 text-slate-200 font-medium text-xs leading-4 uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                  data-bs-dismiss="modal"
                  onClick={onToggle}
                >
                  <IoCloseOutline className="w-10 h-10 text-slate-100 absolute z-[100]" />
                </button>
              </div>

              <div
                ref={overlayRef}
                className="sm:h-[calc(100%-5rem)] w-full my-6 mx-auto relative pointer-events-none "
              >
                <div className="max-h-full min-w-[90vw] max-w-screen-md overflow-hidden border-none shadow-lg absolute left-1/2 -translate-x-1/2 flex flex-col pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                  <div className="flex flex-grow-0 items-center p-4 border-b-2 rounded-t-md dark:bg-gray-900 dark:text-slate-200">
                    <div className="flex ml-10 mr-20 items-center w-auto bg-gradient-to-l from-purple-600 to-blue-500 p-2 rounded-full cursor-pointer border-2 hover:border-slate-400 transition-all duration-200">
                      <div className="leading-8 text-center text-lg sm:text-md text-slate-50 font-regular mx-2 ">
                        {query.data?.user.name}
                      </div>
                      <img
                        className="rounded-full w-8 h-8 mx-4"
                        src={query.data?.user.profile_image?.small}
                        alt="profile image"
                        onClick={() => setClicked(false)}
                      />
                    </div>
                  </div>
                  {/* Main image */}
                  <div className="overflow-y-scroll scrollbar-hide relative mx-auto bg-slate-800 w-full h-auto aspect-square">
                    <div className="relative p-10 mx-auto flex items-center justify-center">
                      <img
                        className={`rounded-lg cursor-zoom-in max-w-screen-md
                        `}
                        src={query.data?.urls?.regular}
                        alt="selected photo"
                        onClick={() => setClicked((prev) => !prev)}
                      />
                    </div>
                    <div className="relative top-1 left-1/2 transform -translate-x-1/2 mx-auto flex flex-shrink-0 justify-center items-center p-2 dark:text-slate-200 text-slate-700 font-body">
                      <h2 className="text-lg text-slate-200">
                        Likes:{" "}
                        <span className="mx-4 opacity-50">
                          {query.data?.likes}
                        </span>
                      </h2>
                      <h2 className="text-lg text-slate-200">
                        Downloads:{" "}
                        <span className="mx-4 opacity-50">
                          {query.data?.downloads}
                        </span>
                      </h2>
                      <h2 className="text-lg text-slate-200">
                        Created at:{" "}
                        <span className=" mx-4 opacity-50">
                          {query.data?.created_at
                            ?.split("-")
                            .join(" ")
                            .slice(0, 10)}
                        </span>
                      </h2>
                    </div>
                    <div className="absolute flex justify-between top-1/2 left-8 right-8 items-center">
                      <a onClick={() => console.log("Next slide")} href="#">
                        <AiFillCaretLeft className="text-slate-300 text-2xl" />
                      </a>
                      <a onClick={() => console.log("Prev slide")} href="#">
                        <AiFillCaretRight className="text-slate-300 text-2xl" />
                      </a>
                    </div>
                    <div className="container mx-auto flex justify-center items-center">
                      <div className="relative bottom-0 max-w-2xl flex flex-1 space-x-2 pt-2 overflow-x-auto scrollbar-hide whitespace-nowrap">
                        {query.data?.tags.map((tag, idx) => (
                          <div
                            key={idx}
                            className="capitalize w-fit text-slate-600 bg-gray-200 dark:bg-gray-600 dark:text-slate-100 px-4 py-2 mb-10 rounded-lg cursor-pointer font-regular"
                          >
                            {tag.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Add categories here */}
              </div>
            </div>
          </Dialog>
        </AnimatePresence>
      </MotionConfig>
    </ReactModal>
  );

  // return (
  //   <MotionConfig
  //     transition={{
  //       x: {
  //         type: "spring",
  //         stiffness: 300,
  //         damping: 30,
  //       },
  //       opacity: {
  //         duration: 0.4,
  //       },
  //     }}
  //   >
  //     <AnimatePresence>
  //       <Dialog
  //         variants={container}
  //         static
  //         as={motion.div}
  //         onClose={onToggle}
  //         open={isOpen}
  //         initial="hidden"
  //         animate="show"
  //       >
  //         <Dialog.Overlay
  //           ref={overlayRef}
  //           as={motion.div}
  //           className="fixed inset-0 z-30 bg-black/60 backdrop-blur-2xl"
  //         />
  //         <div
  //           id="modal"
  //           className="z-50 fixed top-0 left-0 w-full h-full outline-none backdrop-blur-sm backdrop-brightness-75"
  //           tabIndex={-1}
  //           aria-hidden="true"
  //         >
  //           <div className="flex relative flex-shrink-0 flex-wrap items-center p-4  border-t border-gray-200 rounded-b-md z-50">
  //             <button
  //               type="button"
  //               className="inline-block px-2 text-slate-200 font-medium text-xs leading-4 uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
  //               data-bs-dismiss="modal"
  //               onClick={onToggle}
  //             >
  //               <IoCloseOutline className="w-10 h-10 text-slate-100 absolute z-[100]" />
  //             </button>
  //           </div>

  //           <div
  //             ref={overlayRef}
  //             className="sm:h-[calc(100%-5rem)] w-full my-6 mx-auto relative pointer-events-none "
  //           >
  //             <div className="max-h-full min-w-[90vw] max-w-screen-lg overflow-hidden border-none shadow-lg absolute left-1/2 -translate-x-1/2 flex flex-col pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
  //               <div className="flex flex-grow-0 items-center p-4 border-b-2 rounded-t-md dark:bg-gray-900 dark:text-slate-200">
  //                 <div className="flex ml-10 mr-20 items-center w-auto bg-gradient-to-l from-purple-600 to-blue-500 p-2 rounded-full cursor-pointer border-2 hover:border-slate-400 transition-all duration-200">
  //                   <div className="leading-8 text-center text-lg sm:text-md text-slate-50 font-regular mx-2 ">
  //                     {query.data?.user.name}
  //                   </div>
  //                   <img
  //                     className="rounded-full w-8 h-8 mx-4"
  //                     src={query.data?.user.profile_image?.small}
  //                     alt="profile image"
  //                     onClick={() => setClicked(false)}
  //                   />
  //                 </div>
  //               </div>
  //               {/* Main image */}
  //               <div className="overflow-y-auto dark:bg-slate-800 dark:text-slate-50">
  //                 <div className="relative top-0 p-4 mx-auto flex items-center justify-center h-auto aspect-auto">
  //                   <img
  //                     className={`rounded-lg cursor-zoom-in ${
  //                       clicked && "w-full bg-cover "
  //                     }`}
  //                     src={query.data?.urls?.regular}
  //                     alt="selected photo"
  //                     onClick={() => setClicked((prev) => !prev)}
  //                   />
  //                 </div>
  //                 <div className="flex flex-shrink-0 items-center p-2 dark:text-slate-100 text-slate-800">
  //                   <h2 className="text-xl ">
  //                     Likes{" "}
  //                     <span className="mx-4 opacity-70 ">
  //                       {query.data?.likes}
  //                     </span>
  //                   </h2>
  //                   <h2 className="text-xl">
  //                     Downloads{" "}
  //                     <span className="mx-4 opacity-70">
  //                       {query.data?.downloads}
  //                     </span>
  //                   </h2>
  //                   <h2 className="text-xl ">
  //                     Created at{" "}
  //                     <span className=" mx-4 opacity-70">
  //                       {query.data?.created_at
  //                         ?.split("-")
  //                         .join(" ")
  //                         .slice(0, 10)}
  //                     </span>
  //                   </h2>
  //                 </div>
  //                 {/* Tag categories carousel */}
  //                 <h3 className="font-regular px-2 py-4 text-xl border-b-[1px] border-black m-2">
  //                   Related Tags
  //                 </h3>
  //                 <div className="relative w-full flex justify-center items-center mx-2 space-x-2 pt-2 overflow-hidden  max-w-screen-2xl">
  //                   {query.data?.tags.map((tag, idx) => (
  //                     <div
  //                       key={idx}
  //                       className="capitalize w-fit flex flex-wrap flex-shrink whitespace-nowrap text-slate-600 bg-gray-200 dark:bg-gray-600 dark:text-slate-100 px-4 py-2 mb-10 rounded-lg cursor-pointer font-regular"
  //                     >
  //                       {tag.title}
  //                     </div>
  //                   ))}
  //                   <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
  //                     <a onClick={() => console.log("Next slide")} href="#">
  //                       Next slide
  //                     </a>
  //                     <a onClick={() => console.log("Prev slide")} href="#">
  //                       Prev slide
  //                     </a>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </Dialog>
  //     </AnimatePresence>
  //   </MotionConfig>
  // );
};
export default Modal;
