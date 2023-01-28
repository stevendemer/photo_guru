import { Link } from "react-router-dom";
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { useQueries, useQuery } from "react-query";
import { searchPhoto } from "api/fetchPhotos";
import { IPhoto } from "../shared/IPhoto";
import { fetchTopics } from "../api/fetchPhotos";
import Carousel from "./Carousel";
import { useAtom } from "jotai";
import { queryAtom } from "../atoms/postsAtom";
import { ITopic } from "../shared/ITopic";

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

  const { data, isLoading, isError, error } = useQuery<ITopic, Error>({
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
    <div className="min-w-full bg-transparent absolute top-0 z-50 ">
      <div className="mx-auto py-8 flex  items-center container flex-wrap ">
        <div className="sm:text-2xl text-gray-100 ml-2 text-xs font-body font-semibold whitespace-nowrap hover:scale-110 duration-100">
          <Link to="/">Photo Smash</Link>
        </div>
        <div className="container mx-auto">
          <div className="min-w-full items-center justify-center inline-flex pt-8">
            <Carousel topics={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
