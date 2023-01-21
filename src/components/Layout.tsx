import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Hero from "./Hero";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <Hero />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
