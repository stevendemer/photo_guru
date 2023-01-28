import { useState, useRef, useCallback, useEffect } from "react";

export default function useInfiniteScroll(
  onIntersect: (observer: IntersectionObserver) => void
) {
  const ref = useRef<HTMLDivElement>(null);

  const callback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (
        entries.find(
          (item) =>
            item.isIntersecting && Math.floor(item.intersectionRatio) === 1 // how much the element is visible
        )
      ) {
        onIntersect(observer);
      }
    },
    [onIntersect]
  );

  useEffect(() => {
    if (ref.current !== null) {
      const options = {
        rootMargin: "0px",
        threshold: 1.0,
      };
      const observer = new IntersectionObserver(callback, options);
      observer.observe(ref.current);
    }
  }, [ref, callback]);

  return ref;
}
