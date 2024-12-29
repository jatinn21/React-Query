import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "./components/Layout/MainLayout";
import Home from "./Pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import InfiniteScroll from "./Pages/InfiniteScroll";
import FetchRQ from "./Pages/FetchRQ";
import FetchOld from "./Pages/FetchOld";
import "./App.css";
import ErrorPage from "./Pages/ErrorPage";

const route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
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
