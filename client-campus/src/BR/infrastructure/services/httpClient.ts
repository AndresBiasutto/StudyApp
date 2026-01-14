import axios from "axios";

export const httpClient = axios.create({
  baseURL: "http://localhost:3000/api/",
  // baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
