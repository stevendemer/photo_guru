import Layout from "components/Layout";
import Homepage from "pages/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import "./index.css";

const queryClient = new QueryClient();

export default function App() {
  return (
    <Router>
      <Layout>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<Homepage />} />
          </Routes>
        </QueryClientProvider>
      </Layout>
    </Router>
  );
}
