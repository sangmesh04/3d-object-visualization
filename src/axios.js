import axios from "axios";
// import { API_URL } from './static/constants/server-config'
const axiosInstance = axios.create({
  // baseURL: "http://localhost:8080",
  baseURL: "http://localhost:8080",
  headers: {
    "content-type": "application/json",
  },
  responseType: "json",
  withCredentials: true,
});

export default axiosInstance;
