import { ReactNode } from "react";
import Header from "./Header";
import Hero from "./Hero";
import Navigation from "./Navigation";
import Searchbar from "./Searchbar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="dark:bg-gray-800 bg-slate-100 backdrop-brightness-75 backdrop-blur-xl">
      <Header />
      <Navigation />
      <Hero />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
