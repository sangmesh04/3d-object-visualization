import axios from "axios";
// import { API_URL } from './static/constants/server-config'
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8080",
  headers: {
    "content-type": "application/json",
  },
  responseType: "json",
  withCredentials: true,
});

export default axiosInstance;
