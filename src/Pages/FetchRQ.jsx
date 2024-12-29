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
    gcTime:0   // If you want to see the loader every time you comes to this page, you can use this option.
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
