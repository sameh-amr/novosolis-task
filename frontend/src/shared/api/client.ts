import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://backend:3000/api',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default apiClient;
