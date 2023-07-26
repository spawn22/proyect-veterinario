import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
});

instance.interceptors.request.use((config) => {
  config.withCredentials = true;
  return config;
});

export default instance;
