import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// To retrieve all posts from the API
export const getPosts = () => {
  return api.get("/posts");
};

// To retrieve single posts from the API
export const getSinglePost = (id) => {
  return api.get(`/posts/${id}`);
};

// To delete a single posts
export const deleteSinglePost = (id) => {
  return api.delete(`/posts/${id}`);
};

// To update a single posts
export const updateSinglePost = (id) => {
  return api.patch(`/posts/${id}`);
};

// For Getting users api to demonstrate infinite scroll
export const getGithubUsers = async ({ pageParam=1 }) => {
  console.log("pageParam", pageParam);
  const res = await axios.get(
    `https://api.github.com/users?per_page=10&page=${pageParam}`
  );
  return res.status === 200 && res.data;
};

/*

Put and Patch Difference
Put is used to update the entire object. If you have a user object with name,email,password,profile_picture and you want to update the name and the age of the user, you will have to send the entire object with the updated name and age. If you send only the name and age, the other fields will be removed from the object.

Patch is used to update only the specific fields of the object. If you have a user object with name,email,password,profile_picture and you want to update the name and the age of the user, you will have to send only the name and age. The other fields will remain the same.
*/
