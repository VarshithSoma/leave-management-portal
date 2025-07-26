import axios from "axios";

// Create an instance of axios
const api = axios.create({
  baseURL: "http://localhost:5005/api", // Your backend server URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      config.headers["Authorization"] = "Bearer " + user.token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;