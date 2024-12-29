import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "./components/Layout/MainLayout";
import Home from "./Pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import InfiniteScroll from "./Pages/InfiniteScroll";
import FetchRQ from "./Pages/FetchRQ";
import FetchOld from "./Pages/FetchOld";
import "./App.css";
import PageNotFound from "./Pages/PageNotFound";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import FetchIndv from "./Pages/FetchIndv";

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
        path: "/new/:currentPostId",
        element: <FetchIndv />,
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
      <ReactQueryDevtools />
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

useQuery
Fetches and reads data (GET requests) from an API and automatically caches the result.

useMutation
Used for Creating, Updating, and Deleting data (POST, PUT, DELETE requests) from an API.

Garbage collection time or gcTime
In React Query v5, the cacheTime option has been renamed with gcTime.
When you use React Query to get data from an API, it saves the results in the local cache. This means that when you visit the same page again, it will show the data from the cache instead of fetching it or making another API request again. The cache updates automatically if the data changes, so you always get the latest data.
NOTE : You are getting the cache data and not the server data.

By Default, React Query will keep the data in the cache for 5 minutes. After 5 minutes, it will remove the data from the cache and fetch the data again when you visit the page.

Use Case : Imagine you're fetching a list of users. If you go back to same page, React Query will show the saved list from cache instead of reloading it from the server, making the app faster. If a new user is added, React Query will automatically update the cache with the new user. Because it just don't show the loading but you can see the call in the networks and in pending state of the fetch request, you are still be able to see the old data. When the status is success, you will see the new data, if there is new user added and that response is saved in the cache. So you are always be able to see the latest data.


Stale Time
This determines how long fetched data is considered fresh. If the data is older than the stale time, React Query will refetch the data when you visit the page again. By default, the stale time is 0 milliseconds, which means that React Query will always refetch the data when you visit the page again.

When data is initial fetched or updated, It is considered fresh.
After the stale time (in milliseconds) is over, the data is considered stale. If you visit the page again, React Query will refetch the data. But before then no api will be called.


Polling
Polling is a technique used to fetch data from an API at regular intervals. This is useful when you want to show the latest data to the user without them having to refresh the page. Like in the Grow stock price example, you can use polling to fetch the latest stock price every 2 seconds and show it to the user.

The simplest way to implement polling in React Query is to use the refetchInterval option in the useQuery hook. This option takes a number in milliseconds and tells React Query to refetch the data from the API at that interval.

The refetchInterval will always refetch the data at the given interval, even if the data is still considered fresh or is not "stale" within the staleTime period.

    queryKey: ["posts"],
    queryFn: fetchedPosts,
    staleTime: 10000,
    refetchInterval: 2000,
In This case also after every 2 second api call will automatically be made to get the latest data. Even though the data is fresh for 10 seconds, the api will be called after every 2 seconds.

The request will only be made if the tab is on focus or is opened. If user navigated to another tab, the request will not be made. This is to save the resources and to make the app more efficient. But when the user comes back to the tab, the request will be made again.

To make the request even if the tab is not in focus, you can use the refetchIntervalInBackground option in the useQuery hook. This option takes a boolean value and tells React Query to refetch the data even if the tab is not in the scope or not in focused mode.


useMutation
useMutation is a hook that is used to perform create, update, and delete operations on the data. It is used to make POST, PUT, and DELETE requests to the API.
Here there is no mutationKey like we have in queryKey in useQuery.
But we have mutationFn which is used to make the api call to the server.

    const mutation = useMutation(mutationFn,{
    //Optional configurations options here
    });

    **mutationKey is optional

We can provide various configurations options to the useMutation hook like onSuccess, onError, onSettled, mutationKey and many more.

onSuccess : This is a function that is called when the mutation is successful.
onError : This is a function that is called when the mutation fails.
onSettled : This is a function that is called when the mutation is either successful or fails.
mutationKey : This is a key that is used to identify the mutation. This is used to invalidate the cache when the mutation is successful.

To call the mutation function, you can store the mutate function that is returned by the useMutation. but then you need .mutate() to call the function.
Ex : const deleteMutation = useMutation(mutationFn : (id) => deletePost(id));
onClick = {() => deleteMutation.mutate(id)}


*/
