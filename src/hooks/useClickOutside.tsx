import React, { useState, useRef, useEffect, RefObject } from "react";

// Detects when user clicks outside of div
const useClickOutside = (initialState: boolean) => {
  const [isVisible, setIsVisible] = useState<boolean>(initialState);
  const ref = useRef<any>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.currentTarget)) {
      // clicked outside
      setIsVisible(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.currentTarget)) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return {
    ref,
    isVisible,
    setIsVisible,
  };
};

export default useClickOutside;
