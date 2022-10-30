import axios from "axios";
import { postsSet } from "./redux/postsSlice";
import { AppDispatch } from "./redux/store";
import {
  AuthResponse,
  isAuthResponse,
  isPost,
  isPostArray,
  isSignedURLResponse,
  Login,
  PostRequest,
  Signup,
} from "./types";

const api = axios.create({ baseURL: "http://localhost:3001/" });

const getAuthResponse = (response: unknown) => {
  const body = isAuthResponse(response) ? response : null;
  if (!body) {
    throw new Error("Incorrect credentials");
  }
  return body;
};

const handleAuthResponse = (response: AuthResponse) => {
  localStorage.setItem("username", response.username);
  localStorage.setItem("name", response.name);
  localStorage.setItem("token", response.token);
};

const login = async (credentials: Login) => {
  const response = await api.post("/login", credentials);
  return getAuthResponse(response.data);
};

const signup = async (credentials: Signup) => {
  const response = await api.post("/signup", credentials);
  return getAuthResponse(response.data);
};

const createPost = async (post: PostRequest, token: string) => {
  const response = await api.post("/posts", post, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
  if (response.status !== 201) {
    throw new Error("Unable to create post");
  }
  if (!isPost(response.data)) {
    throw new Error("Server did not return created post");
  }
  return response.data;
};

const getPost = async (id: string) => {
  const response = await api.get(`/posts/${id}`);
  if (!isPost(response.data)) {
    throw new Error("Unable to get post");
  }
  return response.data;
};

const getAllPosts = async () => {
  const response = await api.get("/");
  if (!isPostArray(response.data)) {
    throw new Error("Unable to get posts");
  }
  return response.data;
};

const refreshPosts = () => {
  return async (dispatch: AppDispatch) => {
    const posts = await getAllPosts();
    dispatch(postsSet(posts));
  };
};

const getSignedURL = async () => {
  const response = await api.get("/s3");
  if (!isSignedURLResponse(response.data)) {
    throw new Error("Unable to get signed URL");
  }
  const URL = response.data.signedURL;
  console.log(URL);
  return URL;
};

export {
  login,
  signup,
  handleAuthResponse,
  createPost,
  refreshPosts,
  getPost,
  getSignedURL,
};
