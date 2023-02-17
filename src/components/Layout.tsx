import { ReactNode } from "react";
import Header from "./Header";
import Hero from "./Hero";
import Carousel from "./Carousel";
import Searchbar from "./Searchbar";
import { ITopic } from "../shared/ITopic";
import { fetchTopics } from "../api/fetchPhotos";
import { useQuery } from "react-query";

const Layout = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, isError, error } = useQuery<ITopic[], Error>({
    queryKey: ["categories"],
    queryFn: async () => fetchTopics(),
  });

  return (
    <div className="dark:bg-gray-800 bg-slate-200 backdrop-brightness-75 backdrop-blur-xl">
      <Header />
      <Carousel topics={data} />
      <Hero />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
