import { Link } from "react-router-dom";
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { searchPhoto } from "utils/fetchPhotos";
import { IPhoto } from "../shared/IPhoto";

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

  const { status, data, error, refetch } = useQuery<IPhoto[], Error>(
    ["search_photos", query],
    async () => searchPhoto(query),
    { enabled: Boolean(query) }
  );

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>{error.message}</div>;
  }

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <div className="sm:w-full bg-transparent fixed  z-[9999] ">
      <div className="container mx-auto py-4 flex items-center justify-center">
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
      </div>
    </div>
  );
};

export default Header;
