import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'https://franklinramos.vercel.app/api',
    headers: {
      'Content-Type': 'application/json',
    },
  });

axiosInstance.interceptors.request.use(
    (config) => {
        console.log('Request:', config);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        console.log('Axios response: -->', response)
        return response;
    },
    (error) => {
        // Handle the error
        console.error('Response Error:', error);
        return Promise.reject(error);
    }
);

export default axiosInstance;