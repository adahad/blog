import axios from "axios";
import {
  AuthResponse,
  isAuthResponse,
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
};

export { login, signup, handleAuthResponse, createPost };
