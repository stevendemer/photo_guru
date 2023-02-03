import { MouseEventHandler, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { IPhoto } from "../shared/IPhoto";
import { fetchTopics } from "../api/fetchPhotos";
import Carousel from "./Carousel";
import { useAtom } from "jotai";
import { queryAtom, themeAtom } from "../atoms/postsAtom";
import { ITopic } from "../shared/ITopic";
import Searchbar from "./Searchbar";
import { BsFillSunFill, BsFillMoonFill, BsSunFill } from "react-icons/bs";

const Header = () => {
  const [query] = useAtom(queryAtom);
  const [theme, setTheme] = useAtom(themeAtom);

  const { data, isLoading, isError, error } = useQuery<ITopic[], Error>({
    queryKey: ["categories"],
    queryFn: async () => fetchTopics(),
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === "dark" ? "light" : "dark");
    root.classList.add(theme);
  }, [theme, setTheme]);

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

  const onClick = (e: any) => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <div className="w-full bg-transparent absolute top-0 z-50 ">
      <div className="mx-auto py-8 flex  items-center container flex-wrap relative ">
        <div className="sm:text-xl  ml-2 text-xs font-body font-semibold whitespace-nowrap flex justify-around space-x-4 items-center">
          <Link
            className="text-gray-50 dark:text-gray-200 hover:translate-x-10  font-normal duration-200 delay-100 sm:text-2xl text-lg px-4"
            to="/"
          >
            Photo Guru
          </Link>
          <span
            className="cursor-pointer absolute right-10 -translate-x-1/2 sm: "
            onClick={onClick}
          >
            {theme === "light" ? (
              <BsFillMoonFill className="text-gray-100 " />
            ) : (
              <BsSunFill className="text-yellow-200 text-xl sm:text-2xl" />
            )}
          </span>
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
