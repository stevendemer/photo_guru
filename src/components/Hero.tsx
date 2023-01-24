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

  const addDefaultImg = () => {
    return;
    ("https://images.unsplash.com/photo-1584060622420-0673aad46076?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80");
  };

  return (
    <section className="relative overflow-hidden bg-no-repeat bg-cover">
      <img
        onError={() => addDefaultImg()}
        src={data?.urls?.regular}
        alt="background"
        className="max-h-[620px] min-w-full object-cover bg-no-repeat brightness-50"
      />
      <div className="grid font-body max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-20 lg:grid-cols-12 absolute top-24 left-1/4 text-slate-50">
        <div className="mr-auto mt-24 place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white whitespace-nowrap">
            Welcome to Photo Smash
          </h1>
          <p className="max-w-2xl mb-6  text-slate-100 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-300">
            Internet's biggest source of 4K photos
          </p>
          <Searchbar />
        </div>
      </div>
    </section>
  );
};

export default Hero;
