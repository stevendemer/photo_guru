import { ForwardedRef, ReactNode, forwardRef } from "react";

type IProps = {
  children: ReactNode;
};

const PhotoGrid = forwardRef<HTMLInputElement, IProps>(function PhotoGrid(
  props: IProps,
  ref
) {
  const { children } = props;

  return (
    <div className="masonry sm:masonry-sm md:masonry-md mx-4">{children}</div>
  );
});

export default PhotoGrid;
