import useFetchRandomPhoto from "../hooks/useFetchRandomPhoto";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Hero = () => {
  // const { isLoading, isError, data, error, refetch } = useFetchRandomPhoto();

  // if (isError) {
  //   return <div>{error.message}</div>;
  // }

  return (
    <section className="relative overflow-hidden bg-no-repeat bg-cover">
      <img
        src={
          "https://images.unsplash.com/photo-1584060622420-0673aad46076?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
        }
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
          <form className="text-black my-10 w-full">
            <span className="md:flex flex-row bg-slate-50 py-2 items-center justify-around mx-auto rounded-md  border-slate-300-2 w-full ">
              <input
                type="text"
                placeholder="Search for a photo"
                className="rounded-lg bg-transparent text-black font-thin outline-none ring-0  focus:outline-none px-4 py-[10px] w-full"
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
};

export default Hero;
