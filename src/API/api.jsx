import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// To retrieve all posts from the API
export const getPosts = () => {
  return api.get("/posts");
};
