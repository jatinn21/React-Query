import { getPosts } from "../API/api";
import { useQuery } from "@tanstack/react-query";
import ErrorPage from "./ErrorPage";
import Loader from "../components/UI/Loader";

export default function FetchRQ() {
  const fetchedPosts = async () => {
    try {
      const response = await getPosts();
      console.log(response, "and");
      return response.status === 200 ? response.data : [];
    } catch (error) {
      console.log(error);
    }
  };

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchedPosts,
    staleTime: 10000,
    refetchInterval: 2000,
    refetchIntervalInBackground: true,
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
              <h2>{title}</h2>
              <p>{body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
