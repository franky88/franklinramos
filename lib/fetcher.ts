import axiosInstance from "./axiosInstance";

const fetcher = async (url: string) => {
    const response = await axiosInstance.get(url);
    console.log("Fetched data:", response.data);
    return response.data;
};

export default fetcher;