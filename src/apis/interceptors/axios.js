import axios from 'axios';
const baseURL = import.meta.env.VITE_API_BASE_URL ;
// Create an Axios instance
const api = axios.create({
    baseURL, // Set your API base URL here
    timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
    config => {
        // You can modify the request config here if needed
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    response => {
        // You can modify the response here if needed
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;