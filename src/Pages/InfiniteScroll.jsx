import { useInfiniteQuery } from "@tanstack/react-query";
import { getGithubUsers } from "../API/api";
import { useEffect } from "react";
import Loader from "../components/UI/Loader";
import ErrorPage from "./ErrorPage";

export default function InfiniteScroll() {
  const {
    data,
    fetchNextPage,
    status,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["githubUsers"],
    queryFn: getGithubUsers,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length + 1 : false;
    },
  });

  const handleBottomScroll = () => {
    const reachedBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight;
    if (reachedBottom && hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleBottomScroll);
    return () => {
      window.removeEventListener("scroll", handleBottomScroll);
    };
  }, [hasNextPage]);

  if (status === "loading") return <Loader />;
  if (status === "error") return <ErrorPage message="Something Went Wrong" />;

  return (
    <>
      <h1>InfiniteScroll</h1>
      {data?.pages.map((page) => {
        return page.map((user) => {
          return (
            <div
              key={user.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid black",
                padding: "10px",
                margin: "10px 0 ",
                backgroundColor: "lightblue",
              }}
            >
              <h2>{user.login}</h2>
              <img
                src={user.avatar_url}
                alt="avatar"
                height="100px"
                width="100px"
              />
            </div>
          );
        });
      })}
      {isFetchingNextPage && <Loader />}
    </>
  );
}
