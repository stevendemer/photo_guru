import Image from "./Image";
import { IPhoto } from "shared/IPhoto";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Suspense } from "react";
import Spinner from "./Spinner";
import { InfiniteData } from "react-query";

type IProps = {
  posts: IPhoto[] | undefined | InfiniteData<IPhoto[]>;
  isLoading: boolean;
};

const PhotoMasonry = (props: IProps) => {
  const { posts, isLoading } = props;

  //   return (
  //     <Suspense fallback={<Spinner />}>
  //       <div className="mx-auto max-w-[1960px]">
  //         <div className="2xl:columns-4 xl:columns-3 sm:columns-1 gap-4">
  //           {posts?.map((post: IPhoto, idx: number) => (
  //             <div key={idx}>
  //               <Image key={idx} post={post} />
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     </Suspense>
  //   );

  return (
    <Suspense fallback={<Spinner />}>
      <div className="flex justify-start flex-wrap">
        {posts?.map((post: IPhoto, idx: number) => (
          <div
            key={idx}
            className="md:w-1/2 lg:w-1/2 xl:w-1/4 grip grid-cols-2 grid-rows-2 items-stretch"
          >
            <Image key={idx} post={post} />
          </div>
        ))}
      </div>
    </Suspense>
  );
};

export default PhotoMasonry;
