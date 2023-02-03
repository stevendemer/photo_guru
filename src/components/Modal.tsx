import Image from "./Image";
import { Dialog, Transition } from "@headlessui/react";
import { useState, ReactNode, Fragment, useEffect } from "react";
import { IPhoto } from "../shared/IPhoto";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Modal = ({
  setIsOpen,
  isOpen,
  post,
}: {
  setIsOpen: (x: boolean) => void;
  isOpen: boolean;
  post: IPhoto;
}) => {
  console.log("Inside modal");

  // close the modal when Esc is pressed
  useEffect(() => {
    function handleEsc(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    document.addEventListener("keydown", handleEsc);

    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="z-50 fixed inset-0 outline-none h-screen w-full m-auto backdrop-blur-sm"
      tabIndex={1}
    >
      <div
        onClick={() => setIsOpen(false)}
        className=" fixed top-0 left-0 mt-5 ml-6 z-50 text-black text-lg hover:text-slate-700 leading-10"
      >
        X
      </div>
      <div className="max-w-screen-lg sm:h-[calc(100%-3rem)] mx-auto relative flex flex-col w-full text-current">
        <div className="fixed inset-0 bg-black opacity-50" />
        <div className="sticky top-10 z-30 text-black text-xl capitalize text-center leading-tight">
          {post.alt_description}
        </div>
        {/* Content */}
        <div className="flex flex-col justify-center items-center flex-1 bg-slate-200/90 shadow-lg w-full h-screen p-4 fixed left-1/2 -translate-x-1/2 mb-28">
          <img
            className="min-w-[620px] max-w-screen-2xl max-h-full object-none object-center rounded-lg"
            src={post.urls?.regular}
            alt="photo zoomed"
          />
        </div>
      </div>
    </div>
  );
};
export default Modal;
