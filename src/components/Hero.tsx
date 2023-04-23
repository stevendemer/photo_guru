import useFetchRandomPhoto from "../hooks/useFetchRandomPost";
import Searchbar from "./Searchbar";
import { useAtomValue } from "jotai";
import { titleAtom, subtitleAtom } from "../atoms/titleAtom";

const Hero = () => {
  const { isLoading, isError, data, error, refetch } = useFetchRandomPhoto();
  const title = useAtomValue(titleAtom);
  const subtitle = useAtomValue(subtitleAtom);

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <section className="w-full min-w-[768px] sm:h-[420px] min-h-[100vh] relative mx-auto">
      <div className="mx-auto object-none h-full">
        <img
          src={data?.urls?.regular}
          alt="hero background"
          className="w-full min-w-[1500px] min-h-[500px] h-full object-cover bg-center brightness-50"
        />
        <div className="w-full absolute top-5">
          <div className="font-heading px-4 mx-auto lg:py-10 text-slate-50 relative min-w-full flex flex-col items-center">
            <div className="mt-20">
              <h1 className="w-full mb-2 text-2xl font-heading tracking-tight leading-none lg:text-5xl dark:text-slate-100 whitespace-nowrap">
                {title}
              </h1>
              <p className="max-w-2xl text-lg text-slate-100 lg:mb-2 lg:text-xl dark:text-slate-300 font-body">
                {subtitle}
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
