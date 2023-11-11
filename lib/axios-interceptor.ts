import axios from "axios";
import { getServerSession } from "next-auth";
import { authConfig } from "./auth";

const api = axios.create({
  baseURL: process.env.BACKEND_URL,
});

api.interceptors.request.use(async (config) => {
  const session = await getServerSession(authConfig);
  const user = session?.user;
  if (user) {
    config.headers.Authorization = `Bearer ${user.accessToken}`;
  }
  return config;
});

export default api;
