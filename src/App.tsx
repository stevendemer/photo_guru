import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import { Suspense } from "react";

const Layout = lazy(() => import("components/Layout"));
const Homepage = lazy(() => import("pages/Homepage"));
const Loader = lazy(() => import("components/Loader"));
const Searchpage = lazy(() => import("pages/Searchpage"));

import "./index.css";

export default function App() {
  return (
    <Layout>
      <SkeletonTheme baseColor="#313131" highlightColor="#525252">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/s/photos/:query" element={<Searchpage />} />
        </Routes>
      </SkeletonTheme>
    </Layout>
  );
}
