import Image from "./Image";
import { Dialog, Transition } from "@headlessui/react";
import { useState, ReactNode, Fragment } from "react";
import { IPhoto } from "../shared/IPhoto";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Modal = ({
  isOpen,
  setIsOpen,
  post,
}: {
  isOpen: boolean;
  setIsOpen: (x: boolean) => void;
  post: IPhoto;
}) => {
  return (
    <Transition
      show={isOpen}
      enter="transition-all duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      as={Fragment}
      leave="transition duration-100 ease-out"
    >
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto z-50"
      >
        <Dialog
          className="relative z-50"
          open={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div className="relative w-full max-h-fit flex justify-center mt-10">
              <div className="flex items-center justify-center bg-slate-20/20 h-[90vh] py-4 w-full">
                <Dialog.Panel className="max-w-lg">
                  <Dialog.Title className="text-black w-full flex absolute left-0 text-xl text-center">
                    <div className="relative left-6 flex items-center justify-center space-x-2 w-full h-16 select-none mt-2">
                      <div className="absolute cursor-pointer left-2 top-1 space-x-2 inline-block bg-transparent text-slate-50 dark:bg-gray-400/60 mx-4 px-8 py-2 rounded-xl hover:bg-blue-400/50 delay-100">
                        <img
                          className=" object-cover inline-block w-18 h-16 rounded-full"
                          src={post.user.profile_image?.medium}
                        />
                        <span className="text-xs font-regular inline-block capitalize">
                          Uploaded by {post.user.username}
                        </span>
                      </div>
                    </div>
                  </Dialog.Title>
                  <LazyLoadImage
                    className="rounded-lg object-cover"
                    effect="black-and-white"
                    src={post.urls?.regular}
                    alt={post.alt_description}
                  />
                </Dialog.Panel>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    </Transition>
  );
};

export default Modal;
