import axiosInstance from "./axiosInstance";

const fetcher = async (url: string) => {
    const response = await axiosInstance.get(url);
    console.log("Fetched data:", response.data);
    return response.data;
};

// export const fetchProjects = async (categoryId: string | null) => {
//     const queryParam = categoryId ? `?categoryId=${categoryId}` : '';
//     const response = await axiosInstance.get(`/portfolio${queryParam}`);
//     console.log("Fetched Projects:", response.data);
//     return response.data;
// };

export default fetcher;