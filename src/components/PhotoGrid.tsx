import Image from "./Image";
import { IPhoto } from "shared/IPhoto";

type IProps = {
  posts: IPhoto[];
  isLoading: boolean;
};

const PhotoGrid = (props: IProps) => {
  const { posts, isLoading } = props;

  // const renderPosts = posts.map((post, idx) => {
  //   return (
  //     <div className="py-4 px-2 min-w-full last:mb-0 last:pb-0" key={idx}>
  //       {/* {isLoading && <ImageSkeleton images={posts.length} />} */}
  //       <Image post={post} />
  //     </div>
  //   );
  // });

  // const hasContent =
  //   posts && posts.length > 0 ? (
  //     renderPosts
  //   ) : (
  //     <div className="relative">
  //       <div className="flex justify-center items-center text-xl text-gray-400 font-bold">
  //         No posts found !
  //       </div>
  //     </div>
  //   );

  return (
    <div className="h-full container mx-auto">
      <div className="columns-1 gap-2 md:columns-4 ">
        <div className="py-4 px-2 last:mb-0 last:pb-0">
          {posts.map((post) => (
            <Image key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoGrid;
