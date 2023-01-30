import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import { Suspense } from "react";

const Layout = lazy(() => import("components/Layout"));
const Homepage = lazy(() => import("pages/Homepage"));
const Loader = lazy(() => import("components/Loader"));
const Searchpage = lazy(() => import("pages/Searchpage"));
const Topicpage = lazy(() => import("pages/Topicpage"));

import "./index.css";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/s/photos/:query" element={<Searchpage />} />
        <Route path="/t/:topic" element={<Topicpage />} />
      </Routes>
    </Layout>
  );
}
