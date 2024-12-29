import { useEffect, useState } from "react";
import { getPosts } from "../API/api";
import Loader from "../components/UI/Loader";
import ErrorPage from "./ErrorPage";

export default function FetchOld() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState({ error: false, message: "" });

  const fetchedPosts = async () => {
    try {
      setIsLoading(true);
      const response = await getPosts();
      response.status === 200 && setPosts(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsError({ error: true, message: error.message });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchedPosts();
  }, []);

  if (isError.error) {
    
    return <ErrorPage message={isError.message} />;
  }

  return (
    <div>
      {isLoading && <Loader />}
      <ul className="section-accordion">
        {posts?.map((post) => {
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
