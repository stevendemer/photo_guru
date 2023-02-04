import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Hero from "./Hero";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="dark:bg-gray-800 backdrop-brightness-75 backdrop-blur-xl bg-gray-100">
      <Header />
      <Hero />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
