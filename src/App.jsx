import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "./components/Layout/MainLayout";
import Home from "./Pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import InfiniteScroll from "./Pages/InfiniteScroll";
import FetchRQ from "./Pages/FetchRQ";
import FetchOld from "./Pages/FetchOld";
import "./App.css";
import ErrorPage from "./Pages/PageNotFound";
import PageNotFound from "./Pages/PageNotFound";

const route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/old",
        element: <FetchOld />,
      },
      {
        path: "/new",
        element: <FetchRQ />,
      },
      {
        path: "/infinite",
        element: <InfiniteScroll />,
      },
    ],
  },
]);
const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={route}></RouterProvider>;
    </QueryClientProvider>
  );
};

export default App;

/*
In React query, the QueryClientProvider is crucial component that provide the QueryClient instance to your react application. This QueryClient is the core part of react-query library that manages the caching, fetching, and updating of your data.


new QueryClient();
This creates the instance of QueryClient that we are creating to provide to the QueryClientProvider.

QueryClientProvider
this is the part of react-query library and it is used to provide the QueryClient instance to the react application. It is a wrapper component that wraps the entire application and provides the QueryClient instance to the application.
*/
