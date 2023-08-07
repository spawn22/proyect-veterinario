import axios from "axios";

const instance = axios.create({
  baseURL: "https://vetdiary-back-api.onrender.com/api",
});

instance.interceptors.request.use((config) => {
  config.withCredentials = true;
  return config;
});

export default instance;
