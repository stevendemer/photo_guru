import { ReactNode } from "react";

const PhotoGrid = ({ children }: { children: ReactNode }) => {
  return (
    <div className="masonry sm:masonry-sm md:masonry-md mx-4 ">{children}</div>
  );
};

export default PhotoGrid;
