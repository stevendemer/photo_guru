import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import Carousel from "./Carousel";
import { useAtom } from "jotai";
import { queryAtom } from "atoms/queryAtom";
import { themeAtom } from "atoms/themeAtom";
import Searchbar from "./Searchbar";
import { BsFillMoonFill, BsSunFill } from "react-icons/bs";

const Header = () => {
  const [query] = useAtom(queryAtom);
  const [theme, setTheme] = useAtom(themeAtom);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === "dark" ? "light" : "dark");
    root.classList.add(theme);
  }, [theme, setTheme]);

  const onClick = (e: any) => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <div className="w-full bg-slate-200 drop-shadow-lg dark:bg-gray-800">
      <div className="mx-auto py-6 flex  items-center container flex-wrap relative ">
        <div className="sm:text-xl  ml-2 text-xs whitespace-nowrap flex justify-around space-x-4 items-center">
          <Link
            className="text-gray-600 dark:text-gray-200 font-heading duration-100 sm:text-2xl text-lg px-4"
            to="/"
          >
            Photo Guru
          </Link>
          <span
            className="cursor-pointer absolute right-10 -translate-x-1/2 rounded-full duration-300 transition-all"
            onClick={onClick}
          >
            {theme === "light" ? (
              <BsFillMoonFill className="text-slate-600 w-14 h-6 hover:text-yellow-400" />
            ) : (
              <BsSunFill className="text-yellow-100 text-xl sm:text-2xl w-14 h-6 hover:text-yellow-400" />
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
