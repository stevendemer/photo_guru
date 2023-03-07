import { Routes, Route } from "react-router-dom";
import { lazy } from "react";

const Layout = lazy(() => import("components/Layout"));
const Loader = lazy(() => import("components/Spinner"));
const Searchpage = lazy(() => import("pages/Searchpage"));
const Topicpage = lazy(() => import("pages/Topicpage"));
const Homepage = lazy(() => import("pages/Homepage"));

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
