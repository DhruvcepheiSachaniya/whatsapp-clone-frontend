import axios from "axios";
import store from "../../redux/store/store"; // Import your Redux store

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3333";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState(); // Get the current Redux state
    const token = state.user.token; // Access the token from the user slice

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("No token found in Redux state.");
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response: any) => {
    if (response.config.returnFullResponse) {
      return response;
    }
    return response.data;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized! Clearing token and redirecting to login.");
      localStorage.removeItem("persist:user"); // Clear persisted user data
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
