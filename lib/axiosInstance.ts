import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api', // Replace with your API base URL
    headers: {
      'Content-Type': 'application/json',
    },
  });

axiosInstance.interceptors.request.use(
    (config) => {
        // Do something before the request is sent
        console.log('Request:', config);
        return config;
    },
    (error) => {
        // Handle the error
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        // Do something with response data
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