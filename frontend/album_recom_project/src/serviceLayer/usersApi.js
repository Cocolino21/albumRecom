import axiosInstance from "./axiosInstance";


export const fetchAlbums = async () => {

    const response = await axiosInstance.get('/api/albums');
    return response.data;
    
};