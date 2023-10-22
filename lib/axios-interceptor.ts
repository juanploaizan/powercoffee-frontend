import axios from "axios";
import { useSession } from "@/lib/user-session";

const api = axios.create({
  baseURL: process.env.BACKEND_URL,
});

api.interceptors.request.use(async (config) => {
  const user = await useSession();
  if (user) {
    config.headers.Authorization = `Bearer ${user.accessToken}`;
  }
  return config;
});

export default api;
