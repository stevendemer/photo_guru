import useFetchRandomPhoto from "../hooks/useFetchRandomPost";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Skeleton from "react-loading-skeleton";
import Searchbar from "./Searchbar";
import { useEffect } from "react";

const Hero = () => {
  const { isLoading, isError, data, error, refetch } = useFetchRandomPhoto();

  if (isError) {
    return <div>{error.message}</div>;
  }

  if (isLoading) {
    return (
      <div className="bg-cover relative overflow-hidden">
        <div className="bg-no-repeat object-cover max-h-[620px] min-w-full">
          <Skeleton count={1} />
        </div>
      </div>
    );
  }

  return (
    <section className="w-full min-w-[768px] sm:h-[420px] min-h-[768px] relative mx-auto">
      <div className="mx-auto object-none h-full">
        <img
          src={data?.urls?.regular}
          alt="hero background"
          className="w-full min-w-[1500px] min-h-[500px] h-full object-cover bg-center brightness-50"
        />
        <div className="w-full absolute top-0">
          <div className="font-heading px-4 py-8 mx-auto lg:py-20 text-slate-50 relative min-w-full flex flex-col items-center">
            <div className="mt-20">
              <h1 className="w-full mb-4 text-2xl font-extrabold tracking-tight leading-none lg:text-5xl dark:text-slate-100 whitespace-nowrap">
                Welcome to Photo Guru
              </h1>
              <p className="max-w-2xl mb-6 text-xl text-slate-100 lg:mb-8 lg:text-3xl dark:text-slate-300">
                Internet's biggest source of 4K photos
              </p>
            </div>
          </div>
          <Searchbar />
        </div>
      </div>
    </section>
  );
};

export default Hero;
