import ReactDOM from "react-dom/client";
import App from "./App";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
import store from "./store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // stale time to 20 seconds
      staleTime: 2000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

const el = document.getElementById("root") as HTMLElement;

const root = ReactDOM.createRoot(el);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <QueryClientProvider client={queryClient}>
          <App />
          <ToastContainer />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);
