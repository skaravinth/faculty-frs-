// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000', // Replace with your API base URL
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Retrieve the JWT token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
