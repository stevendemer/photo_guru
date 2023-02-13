import React, { useState, useRef, useEffect, RefObject } from "react";
import { SyntheticEvent } from "react";

// Detects when user clicks outside of div
const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T>,
  handler: (e: MouseEvent) => void
): void => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.currentTarget as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
};

export default useClickOutside;
