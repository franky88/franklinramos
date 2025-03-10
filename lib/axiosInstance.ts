import axios, { AxiosInstance } from 'axios';

let baseURL = "http://localhost:3000/api"

if (process.env.NODE_ENV === "production") {
    baseURL = 'https://franklinramos.vercel.app/api'
} else {
    baseURL = 'http://localhost:3000/api'
}

const axiosInstance: AxiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

axiosInstance.interceptors.request.use(
    (config) => {
        // console.log('Request:', config);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        // console.log('Axios response: -->', response)
        return response;
    },
    (error) => {
        // Handle the error
        console.error('Response Error:', error);
        return Promise.reject(error);
    }
);

export default axiosInstance;