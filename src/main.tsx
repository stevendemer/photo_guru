import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { atomsWithQuery, queryClientAtom } from "jotai-tanstack-query";
import { Provider } from "jotai";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "react-toastify/dist/ReactToastify.css";

import { Suspense } from "react";
import Loader from "components/Loader";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // stale time to 20 seconds
      staleTime: Infinity,
      keepPreviousData: true,
    },
  },
});

const el = document.getElementById("root") as HTMLElement;

const root = ReactDOM.createRoot(el);

root.render(
  <Suspense fallback={<Loader />}>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Provider initialValues={[[queryClientAtom, queryClient]]}>
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <App />
          </SkeletonTheme>
        </Provider>
        <ToastContainer />
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </Suspense>
);
