import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://localhost:7063/api",
  headers: { "Content-Type": "application/json" }
});

// Centralized error handling
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;