import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { fetchRandom } from "../utils/fetchPhotos";
import { IPhoto } from "../shared/IPhoto";

const Hero = () => {
  const { isLoading, isError, data, error } = useQuery<IPhoto, Error>(
    ["random_photo"],
    () => fetchRandom()
  );

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <section className="relative overflow-hidden bg-no-repeat bg-cover">
      <img
        src={data?.urls?.regular}
        alt="background"
        className="h-[720px] w-full brightness-50"
      />
      <div className="grid font-body max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 absolute top-24 left-1/4 text-slate-50">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white whitespace-nowrap">
            Welcome to Photo Smash
          </h1>
          <p className="max-w-2xl mb-6  text-slate-100 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-300">
            Internet's biggest source of 4K photos
          </p>
          <form className="  text-black my-10 w-full">
            <span className="md:flex flex-row bg-slate-50  items-center justify-around mx-auto rounded-md   border-slate-300-2">
              <input
                type="text"
                placeholder="Search for a photo"
                className="rounded-lg bg-transparent text-black outline-none ring-0  focus:outline-none px-4 py-[10px] w-full"
              />
              <button className=" text-black font-bold px-2 py-1 outline-none hover:outline-2 hover:opacity-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </span>
          </form>
        </div>
      </div>
    </section>
  );
  {
    /* 
  return (
    <section className="relative top-0">
      <div className="grid max w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img
            className="bg-cover bg-no-repeat w-full h-1/5  brightness-75   "
            src={data?.urls?.regular}
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="absolute top-2/4 text-slate-50 max-w-full mx-20">
            <div className="w-full">
              <div className="sm:text-4xl text-2xl mx-auto">
                {" "}
                Welcome to Photo Smash
              </div>
              <div className="sm:text-md text-xl">
                Internet's biggest source of{" "}
                <span className="font-semibold">4K photos</span>
              </div>
            </div>
            <form className="w-full flex-1 text-black my-10">
              <span className="md:flex flex-row bg-slate-50  items-center justify-around mx-auto rounded-md   border-slate-300-2">
                <input
                  type="text"
                  placeholder="Search for a photo"
                  className="rounded-lg bg-transparent text-black outline-none ring-0  focus:outline-none px-4 py-[10px]"
                />
                <button className=" text-black font-bold px-2 py-1 outline-none hover:outline-2 hover:opacity-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </button>
              </span>
            </form>
          </div>
        </div>
      </div>
    </section>
  ); */
  }
};

export default Hero;
