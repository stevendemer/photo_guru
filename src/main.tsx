import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { QueryClientProvider, QueryClient, QueryCache } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { queryClientAtom } from "jotai-tanstack-query";
import { Provider } from "jotai";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "react-toastify/dist/ReactToastify.css";

import { Suspense } from "react";
import Loader from "components/Loader";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 24,
      keepPreviousData: true,
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error: any, query) => {
      if (query.state.data !== undefined) {
        // only show error if we already have data in the cache
        toast.error(`Something went wrong ${error.message}`);
      }
    },
  }),
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
