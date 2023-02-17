import Image from "./Image";
import { IPhoto } from "shared/IPhoto";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

type IProps = {
  posts: IPhoto[];
  isLoading: boolean;
};

const PhotoGrid = (props: IProps) => {
  const { posts, isLoading } = props;

  return (
    <div className="h-full w-full mx-auto">
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 760: 3, 900: 4 }}>
        <Masonry columnsCount={4}>
          {posts.map((post, idx) => (
            <div key={idx} className="px-2 last:mb-0 last:pb-0">
              <Image key={idx} post={post} />
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default PhotoGrid;
