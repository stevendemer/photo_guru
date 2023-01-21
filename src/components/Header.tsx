import { Link } from "react-router-dom";
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { useQueries, useQuery } from "react-query";
import { searchPhoto } from "utils/fetchPhotos";
import { IPhoto } from "../shared/IPhoto";
import { fetchTopics } from "../utils/fetchPhotos";
import { ITopic } from "../shared/ITopic";
import Carousel from "./Carousel";

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
  const [query, setQuery] = useState<string>("");

  const [photosQuery, topicsQuery] = useQueries([
    {
      queryKey: ["photos_query", query],
      queryFn: async () => searchPhoto(query),
      enabled: Boolean(query),
    },
    {
      queryKey: ["categories"],
      queryFn: fetchTopics,
    },
  ]);

  useEffect(() => {
    photosQuery.refetch();
  }, [query]);

  if (photosQuery.isLoading) {
    return <div>Photos loading...</div>;
  }

  if (topicsQuery.isLoading) {
    return <div>Topics loading...</div>;
  }

  // if (topicsQuery.isError) {
  //   return <div>{topicsQuery.error.message}</div>;
  // }

  // if (photosQuery.isError) {
  //   return <div>{photosQuery.error}</div>;
  // }

  return (
    <div className="min-w-full bg-transparent absolute top-0 z-50 ">
      <div className="mx-auto py-8 flex  items-center container flex-wrap ">
        <div className="sm:text-lg text-gray-100 ml-2 text-xs font-body whitespace-nowrap ">
          Photo Smash
        </div>
        <div className="sm:flex items-center mx-auto sm:justify-center space-x-4 hidden">
          {routes.map((route, idx) => (
            <Link
              to={route.route}
              key={idx}
              className="rounded-lg py-2 px-4 text-gray-50 hover:bg-slate-200 hover:text-slate-800 space-x-2 transition-colors duration-300 lg:text-lg text-xs"
            >
              {route.title}
            </Link>
          ))}
        </div>
        <div className="container mx-auto">
          <div className="min-w-full items-center justify-center inline-flex pt-8">
            <Carousel topics={topicsQuery.data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
