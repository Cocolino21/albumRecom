import { data } from "react-router-dom";
import axiosInstance from "./axiosInstance";


export const fetchMyUser = async () => {

    const response = await axiosInstance.get('/api/users/my_profile',{
        withCredentials: true, 
      });
    return response.data;
    
};

export const updateUser = async (dataUpdate) =>{
    try{
    const d = await axiosInstance.get('/api/users/my_profile',{
            withCredentials: true, 
          });
    let data = d.data;
    const response = await axiosInstance.post('/api/users/update/user=' + data.user_id, {
        username: dataUpdate.username,
        password: dataUpdate.password,
        email: dataUpdate.email,
        withCredentials:true
    });
    return true;
    }
    catch(error){
        console.error('Update error:', error);
        return false;
    }
}

export const fetchFollowingForMyUser = async (name) =>{
    name=name==null?'':name;
    try{
    const d = await axiosInstance.get('/api/users/my_profile',{
            withCredentials: true, 
          });
    let data = d.data;
    const response = await axiosInstance.get(
        `/api/users/get_following_list/user=${data.user_id}&name_starts_with=${encodeURIComponent(name)}`, 
        { withCredentials: true }
    );
    return response.data;
    }
    catch(error){
        console.error('Update error:', error);
        return null;
    }
}

export const fetchFriendRequestsForMyUser = async () =>{
    try{
    const d = await axiosInstance.get('/api/users/my_profile',{
            withCredentials: true, 
          });
    let data = d.data;
    const response = await axiosInstance.get(
        `/api/users/get_friend_req_list/user=${data.user_id}`, 
        { withCredentials: true }
    );
    return response.data;
    }
    catch(error){
        console.error('Update error:', error);
        return null;
    }
}

export const fetchUserById = async (userId) => {
    try {
        const response = await axiosInstance.get(`/api/users/user=${userId}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Fetch user error:', error);
        return null;
    }
};


export const fetchUserReviews = async (id) => {
    try {
      const response = await axiosInstance.get(`/api/reviews/user=${id}`, {
          withCredentials: true
      });
      return response.data;
  } catch (error) {
      console.error('Error fetching songs:', error);
      throw error;
  }
}

export const fetchUserPosts = async (id) => {
    try {
      const response = await axiosInstance.get(`/api/posts/wall_user=${id}`, {
          withCredentials: true
      });
      return response.data;
  } catch (error) {
      console.error('Error fetching songs:', error);
      throw error;
  }
}


export const followUser = async (userId) => {
    try {
        const response = await axiosInstance.post(`/api/users/follow/user=${userId}`, {}, {
            withCredentials: true
        });
        return true;
    } catch (error) {
        console.error('Follow error:', error);
        return false;
    }
};




export const checkForUserFollow = async (userId) => {
    try {
        const response = await axiosInstance.get(`/api/users/follow/check/user=${userId}`, {}, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Follow error:', error);
        return false;
    }
};


export const checkForFriendship = async (userId) => {
    try {
        const response = await axiosInstance.get(`/api/users/friendship/check/user=${userId}`, {}, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Follow error:', error);
        return false;
    }
};

export const userPost = async (userId, albumData, commentData, imageData) => {
    try{
        const profileResponse = await axiosInstance.get('/api/users/my_profile', {
            withCredentials: true, 
        });

        const currentUser = profileResponse.data;

        const userProfileResponse = await axiosInstance.get(`/api/users/user=${userId}`, {
            withCredentials: true
        });

        const userData = userProfileResponse.data;

        const postData = {
            user: {
                user_id: userData.user_id,
                username: userData.username,
                email: userData.email,
                userProfilePictureUrl: userData.userProfilePictureUrl || null,
            },
            poster: {
                user_id: currentUser.user_id,
                username: currentUser.username,
                email: currentUser.email,
                userProfilePictureUrl: currentUser.userProfilePictureUrl || null,
            },
            album: {
                albumId: albumData.albumId,
                albumName: albumData.albumName,
                albumDuration: albumData.albumDuration,
                albumCoverImageUrl: albumData.albumCoverImageUrl || null,
                albumRating: albumData.albumRating,
                albumReviewNumber: albumData.albumReviewNumber,
                albumReleaseDate: albumData.albumReleaseDate,
                albumGenre: albumData.albumGenre,
            },
            comment: commentData,
            imageUrl: imageData || null,
            postDate: new Date().toISOString(),
        };

        const response = await axiosInstance.post('/api/posts/post_wall', postData, {
            withCredentials: true,
        });

        return true;
    }catch(error){
        console.error('Post error:', error);
        return false;
    }
}