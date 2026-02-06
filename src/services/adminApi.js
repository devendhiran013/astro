import axios from "axios";

const adminApi = axios.create({
  baseURL: "http://localhost:5000/admin",
});

adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `JWT ${token}`;
  }
  return config;
});

export default adminApi;
