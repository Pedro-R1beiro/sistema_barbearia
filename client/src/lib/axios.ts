import { env } from "@/env";
import axios from "axios";

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  await new Promise((resolve) =>
    setTimeout(resolve, Math.round(Math.random() * 3000)),
  );
  return config;
});
