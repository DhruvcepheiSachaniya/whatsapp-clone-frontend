import axios from "axios";
//need to add redux store

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const { token } = JSON.parse(localStorage.getItem("user") || "{}");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    //TODO:- SOlve the issue of resonse and resopnse.data login get response and other get response.data
    if (response.config.returnFullResponse) {
      return response;
    }

    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
