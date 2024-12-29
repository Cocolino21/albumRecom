import axiosInstance from "./axiosInstance";


export const fetchAlbums = async () => {

    const response = await axiosInstance.get('/api/albums/recent',{
        withCredentials: true, 
      });
    return response.data;
    
};


export const fetchAlbumById = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/albums/album=${id}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching album:', error);
        throw error;
    }
};

export const fetchAlbumSongs = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/songs/by_album=${id}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching songs:', error);
        throw error;
    }
};