import axios from "axios";
import { isAuthResponse, Login, Signup } from "./types";

const api = axios.create({ baseURL: "http://localhost:3001/" });

const handleAuthResponse = (response: unknown) => {
  const body = isAuthResponse(response) ? response : null;
  if (!body) {
    throw new Error("Incorrect credentials");
  }
  return body;
};

const login = async (credentials: Login) => {
  const response = await api.post("/login", credentials);
  return handleAuthResponse(response.data);
};

const signup = async (credentials: Signup) => {
  const response = await api.post("/signup", credentials);
  return handleAuthResponse(response.data);
};

export { login, signup };
