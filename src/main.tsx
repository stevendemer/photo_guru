import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { atomsWithQuery, queryClientAtom } from "jotai-tanstack-query";

import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import { Provider } from "jotai";
import { Suspense } from "react";
import Loader from "components/Loader";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // stale time to 20 seconds
      staleTime: 5000,
      refetchOnWindowFocus: true,
      refetchOnMount: false,
    },
  },
});

const el = document.getElementById("root") as HTMLElement;

const root = ReactDOM.createRoot(el);

root.render(
  <Suspense fallback={<Loader />}>
    <Router>
      <QueryClientProvider client={queryClient}>
        <Provider initialValues={[[queryClientAtom, queryClient]]}>
          <App />
        </Provider>
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Router>
  </Suspense>
);
