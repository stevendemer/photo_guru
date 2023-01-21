import Layout from "components/Layout";
import Homepage from "pages/Homepage";
import { Routes, Route } from "react-router-dom";
import "./index.css";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </Layout>
  );
}
