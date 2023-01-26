import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Hero from "./Hero";
import { useIsFetching } from "react-query";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <Hero />
      <main>{children}</main>
    </>
  );
};

export default Layout;
