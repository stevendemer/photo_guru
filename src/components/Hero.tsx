import useFetchRandomPhoto from "../hooks/useFetchRandomPost";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Skeleton from "react-loading-skeleton";
import Searchbar from "./Searchbar";

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
    <section className="w-full overflow-hidden bg-no-repeat bg-cover sm:h-[310px] min-h-[600px] relative">
      <img
        src={data?.urls?.regular}
        alt="background"
        className="w-full object-cover bg-no-repeat brightness-50 h-screen"
      />
      <div className="absolute w-full">
        <div className="font-body px-4 py-8 mx-auto lg:py-20 text-slate-50 ">
          <div className="mr-auto mt-24 place-self-center lg:col-span-7">
            <h1 className="w-full mb-4 text-2xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-2xl dark:text-white whitespace-nowrap">
              Welcome to Photo Smash
            </h1>
            <p className="max-w-2xl mb-6  text-slate-100 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-300">
              Internet's biggest source of 4K photos
            </p>
            <Searchbar />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
