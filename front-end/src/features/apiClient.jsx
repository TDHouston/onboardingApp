import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8080/api";

console.log("API Base URL:", baseURL);

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
