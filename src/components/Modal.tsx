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
      enter="transition duration-200 ease-out"
      enterFrom="transform scale-95 opacity-0"
      as={Fragment}
      leave="transition duration-100 ease-out"
    >
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel>
            <Dialog.Title className="text-slate-50 text-xl text-center">
              Check out this photo
            </Dialog.Title>
            <div className="container max-w-lg">
              <LazyLoadImage
                effect="blur"
                className="flex justify-center items-center"
                src={post.urls?.regular}
                alt={post.alt_description}
              />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
