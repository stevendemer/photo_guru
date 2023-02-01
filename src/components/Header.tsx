import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { IPhoto } from "../shared/IPhoto";
import { fetchTopics } from "../api/fetchPhotos";
import Carousel from "./Carousel";
import { useAtom } from "jotai";
import { queryAtom } from "../atoms/postsAtom";
import { ITopic } from "../shared/ITopic";
import Searchbar from "./Searchbar";

const routes = [
  {
    title: "Home",
    route: "/",
  },
  {
    title: "Profile",
    route: "/profile",
  },
];

const Header = () => {
  const [query] = useAtom(queryAtom);

  const { data, isLoading, isError, error } = useQuery<ITopic[], Error>({
    queryKey: ["categories"],
    queryFn: async () => fetchTopics(),
  });

  if (isLoading) {
    return <div>Categories are loading...</div>;
  }

  if (isError) {
    return (
      <div className="flex justify-center text-center">
        <div className="text-xl text-red-500">{error.message}</div>
      </div>
    );
  }

  return (
    <div className="w-full bg-transparent absolute top-0 z-50 ">
      <div className="mx-auto py-8 flex  items-center container flex-wrap ">
        <div className="sm:text-xl text-gray-100 ml-2 text-xs font-body font-semibold whitespace-nowrap hover:scale-x-105 duration-200">
          <Link to="/">Photo Guru</Link>
        </div>
        <div className="container mx-auto pt-20">
          <div className="min-w-full items-center justify-center flex-col ">
            <Carousel topics={data} />
            <Searchbar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
