import { NavLink, useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/UI/Loader";
import ErrorPage from "./ErrorPage";
import { getSinglePost } from "../API/api";
import { use, useEffect } from "react";

export default function FetchIndv() {
  const { currentPostId } = useParams();
  const navigate = useNavigate();

  const fetchedSinglePost = async () => {
    try {
      const response = await getSinglePost(currentPostId);
      console.log(response, "response");
      return response.status == 200 && response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["singlePost", currentPostId],
    queryFn: fetchedSinglePost,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorPage message={error.message} />;
  }

  return (
    <>
      <div
        className="section-accordion"
        style={{ padding: "20px", border: "2px solid white" }}
      >
        <h1>Current Post ID : {currentPostId}</h1>
        <p>{data.title}</p>
        <p>{data.body}</p>
      </div>
      <button onClick={() => navigate(-1)} style={{ marginTop: "20px" }}>
        Back to home <i className="far fa-hand-point-right"></i>
      </button>
    </>
  );
}
