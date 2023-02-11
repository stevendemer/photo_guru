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

const Modal = ({
  onClose,
  isOpen,
  post,
}: {
  onClose: (x: boolean) => void;
  isOpen: boolean;
  post: IPhoto;
}) => {
  console.log("Inside modal");

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
        className="z-50 fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="sm:h-[calc(100%-3rem)] w-full my-6 mx-auto relative pointer-events-none">
          <div className="max-h-full min-w-[90vw] max-w-screen-lg  overflow-hidden border-none shadow-lg absolute left-1/2 -translate-x-1/2 flex flex-col pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="flex flex-shrink-0 items-center justify-center p-4 border-b border-gray-200 rounded-t-md">
              <h5 className="text-xl font-medium leading-normal text-gray-800 relative mx-auto">
                {post.alt_description}
              </h5>
            </div>
            <div className="flex-auto  overflow-y-auto relative top-2 p-4 w-full">
              <img
                className="min-w-fit max-w-screen-md object-center max-h-full rounded-lg object-contain mx-auto"
                src={post.urls?.regular}
                alt="selected photo"
              />
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
              <button
                type="button"
                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );

  // return (
  //   <div
  //     aria-hidden="true"
  //     classNameName="z-50 fixed top-0 left-0 w-full h-full outline-none overflow-y-auto overflow-x-hidden"
  //     tabIndex={-1}
  //   >
  //     <div classNameName="sm:h-[calc(100%-3rem)] max-w-xl my-6 mx-auto relative w-auto pointer-events-none">
  //       <div classNameName="max-h-full overflow-hidden border-none shadow-lg relative flex flex-col w-full bg-slate-100 bg-clip-padding rounded-md outline-none text-current">
  //         <div classNameName="flex flex-shrink-0 items-center justify-between p-4 border-b rounded-t-md">
  //           <h2 classNameName="text-xl font-medium leading-8 text-center text-slate-50">
  //             {post.alt_description}
  //           </h2>
  //         </div>
  //         <div classNameName="max-w-screen-lg sm:h-[calc(100vh-8rem)] mx-auto relative flex flex-col w-full text-current">
  //           <div classNameName="fixed inset-0 bg-black opacity-50" />
  //           <div classNameName=" top-10 z-30 text-black text-xl capitalize text-center leading-tight">
  //             <div classNameName="fixed w-fit left-0 top-10  ">
  //               <div classNameName="flex flex-1 ml-20 justify-center items-center w-full max-w-xs bg-cyan-400 p-2 rounded-full cursor-pointer border-2 border-black">
  //                 <div classNameName="leading-8 text-center text-lg sm:text-md text-slate-50 font-regular mx-2 ">
  //                   {post.user.name}
  //                 </div>
  //                 <img
  //                   classNameName="rounded-full w-8 h-8 mx-4"
  //                   src={post.user.profile_image?.small}
  //                   alt="profile image"
  //                 />
  //               </div>
  //             </div>
  //           </div>
  //           {/* Content */}
  //           <div classNameName="flex justify-center items-center flex-1 bg-slate-200 dark:bg-black/70 shadow-lg w-full h-screen p-4 mx-auto  fixed left-1/2 -translate-x-1/2 mb-28">
  //             <img
  //               classNameName="min-w-fit w-full max-w-screen-2xl max-h-full object-none object-center rounded-lg cursor-pointer"
  //               src={post.urls?.regular}
  //               alt="selected photo"
  //             />
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
};
export default Modal;
