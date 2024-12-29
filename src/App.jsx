import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "./components/Layout/MainLayout";
import Home from "./components/Layout/Pages/Home";
import About from "./components/Layout/Pages/About";
import Contact from "./components/Layout/Pages/Contact";

const route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={route}></RouterProvider>;
};

export default App;
