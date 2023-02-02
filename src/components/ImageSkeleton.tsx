import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ImageSkeleton = ({ images }: { images: number }) => {
  return (
    <>
      {Array(images)
        .fill(0)
        .map((_, idx) => (
          <div key={idx} className="container mx-auto space-x-4">
            <div className="flex space-around px-2">
              <Skeleton borderRadius="0.75em" width={40} height={40} />
            </div>
          </div>
        ))}
    </>
  );
};

export default ImageSkeleton;
