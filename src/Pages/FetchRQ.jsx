import { deleteSinglePost, getPosts, updateSinglePost } from "../API/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ErrorPage from "./ErrorPage";
import Loader from "../components/UI/Loader";
import { NavLink } from "react-router";

export default function FetchRQ() {
  const queryClient = useQueryClient();

  const fetchedPosts = async () => {
    try {
      const response = await getPosts();
      return response.status === 200 ? response.data : [];
    } catch (error) {
      console.log(error);
    }
  };

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["allPosts"],
    queryFn: fetchedPosts,
    // staleTime: 10000,
    // refetchInterval: 2000,
    // refetchIntervalInBackground: true,
  });

  // To Delete the Post
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteSinglePost(id),
    onSuccess: (data, id) => {
      console.log(
        data,
        "checking the entire data of allPosts queryKey",
        id,
        queryClient.getQueryData(["allPosts"])
      );
      queryClient.setQueryData(["allPosts"], (cacheData) => {
        return cacheData.filter((post) => post.id !== id);
      });
    },
    onError: () => {
      console.log("Error Deleting Post");
    },
    onSettled: () => {
      console.log("Delete Mutation Settled");
    },
  });

  // To Update the Post
  const updateMutation = useMutation({
    mutationFn: (id) => updateSinglePost(id),
    onSuccess: (data, id) => {
      queryClient.setQueryData(["allPosts"], (cacheData) => {
        console.log(
          data,
          "checking the entire data of allPosts queryKey",
          cacheData
        );
        return cacheData.map((post) => {
          return post.id === id
            ? { ...post, title: "Updated Title By Jatin" }
            : post;
        });
      });
    },
    onError: () => {
      console.log("Error Updating Post");
    },
    onSettled: () => {
      console.log("Update Mutation Settled");
    },
  });

  if (isError) {
    return <ErrorPage message={error.message} />;
  }

  return (
    <div>
      {isPending && <Loader />}
      <ul className="section-accordion">
        {data?.map((post) => {
          const { id, title, body } = post;
          return (
            <li key={id}>
              <NavLink to={`/new/${id}`}>
                <h2>{title}</h2>
                <p>{body}</p>
              </NavLink>
              <button
                onClick={() => deleteMutation.mutate(id)}
                style={{ backgroundColor: "red" }}
              >
                Delete Post
              </button>
              <button onClick={() => updateMutation.mutate(id)}>
                Update Post
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/*

Mutate() function is used to execute the mutation in react query. the process is the same whether you are using useMutation or useQuery.
Deleting Data,
Updating Data,
Creating new Data.

When you call .mutate(), it tells React Query to execute the mutation function that you provided in the useMutation hook. In this case, it will call the deleteSinglePost function with the id of the post that you want to delete. This is needed because the mutation is an action that changes the data on the server, unlike queries which are used to fetch the data from the server and are often auto-executed.


To get the local cache data, 
Step 1 : you can use the useQueryClient
const queryClient = useQueryClient();

Step 2 : use the queryClient object that is provided by the useMutation hook.
queryClient.setQueryData(queryKey,callback function that will return the updated data that you want to set in the cache);
There is queryClient.getQueryData() function that is used to get the data from the cache.

*/
