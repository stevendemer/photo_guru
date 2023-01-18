import PhotoGrid from "components/PhotoGrid";
import { fetchPhotos } from "utils/fetchPhotos";
import { useQuery } from "react-query";
import { IPhoto } from "shared/IPhoto";
import Image from "components/Image";

const Homepage = () => {
  const { status, data, error } = useQuery({
    queryKey: ["photos"],
    queryFn: fetchPhotos,
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>{error.message}</div>;
  }

  return (
    <div className="px-4 py-8 sm:w-full">
      <PhotoGrid>
        {data?.map((post) => (
          <div className="py-4 px-2 min-w-full " key={post.id}>
            <Image
              author={post.user.name}
              url={post.urls?.regular}
              alt={post.alt_description}
            />
          </div>
        ))}
      </PhotoGrid>
    </div>
  );
};

export default Homepage;
