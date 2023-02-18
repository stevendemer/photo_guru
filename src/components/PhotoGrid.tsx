import Image from "./Image";
import { IPhoto } from "shared/IPhoto";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Suspense } from "react";
import Spinner from "./Spinner";

type IProps = {
  posts: IPhoto[];
  isLoading: boolean;
};

const PhotoGrid = (props: IProps) => {
  const { posts, isLoading } = props;

  return (
    <Suspense fallback={<Spinner />}>
      <div className="h-full w-full mx-auto">
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 4 }}>
          <Masonry>
            {posts.map((post, idx) => (
              <div key={idx} className="px-2 last:mb-0 last:pb-0">
                <Image post={post} />
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </Suspense>
  );
};

export default PhotoGrid;
