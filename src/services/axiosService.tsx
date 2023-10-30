import axios, { InternalAxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/",
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.withCredentials = true;

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axiosInstance.get(
          "http://localhost:8000/auth/refresh"
        );
        localStorage.setItem("accessToken", response?.data?.accessToken);
        return axiosInstance.request(originalRequest);
      } catch (e) {
        console.log(e);
      }
    }
    throw Error;
  }
);
