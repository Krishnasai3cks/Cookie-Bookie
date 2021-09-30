import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3001" });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});
export const getPosts = () => API.get("/posts");
export const createPost = (newPost) => API.post("/posts/create", newPost);
export const likePost = (id) => API.post("/posts/like", id);
export const updatePost = (id) => API.post("/posts/update?id=" + id);
export const placeBid = (postId, userId, value) =>
  API.post("/posts/placeBid", { postId, userId, value });
export const removeBid = (postId, userId) =>
  API.post("/posts/removeBid", { postId, userId });
export const login = (formData) => API.post("/user/login", formData);
export const register = (formData) => API.post("/user/register", formData);
export const getUser = () => API.get("/user");
export const logout = () => API.post("/user/logout");
