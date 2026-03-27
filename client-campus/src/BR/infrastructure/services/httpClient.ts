import axios, { type AxiosInstance, type AxiosError } from "axios";
import { store } from "../../../store/store";
import { logout } from "../../../store/slices/authSlice/auth.slice";
import type { ApiError } from "../errors/apiError";

const httpClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
    }

    if (error.response?.data?.error) {
      return Promise.reject(new Error(error.response.data.error));
    }

    return Promise.reject(error);
  }
);

export { httpClient };
