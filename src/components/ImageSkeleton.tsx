import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ImageSkeleton = ({ posts }: { posts: number }) => {
  return Array(posts)
    .fill(0)
    .map((_, idx) => (
      <div className="py-4 w-fit space-x-2 cursor-pointer relative ">
        <Skeleton count={4} style={{ marginBottom: "0.6rem" }} />
      </div>
    ));
};

export default ImageSkeleton;
