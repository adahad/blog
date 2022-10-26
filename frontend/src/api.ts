import axios from "axios";
import { AuthResponse, isAuthResponse, Login, Signup } from "./types";

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

export { login, signup, handleAuthResponse };
