import axios from "axios";

const apiClient = axios.create({
  baseURL:  "http://localhost:5000/api",
  // Essential CORS configuration
  withCredentials: false, // Set to true if your backend uses cookies/sessions
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
});

export default apiClient;