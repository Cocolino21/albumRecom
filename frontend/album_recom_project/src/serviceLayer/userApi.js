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
        `/api/users/getFriendList/user=${data.user_id}&name_starts_with=${encodeURIComponent(name)}`, 
        { withCredentials: true }
    );
    return response.data;
    }
    catch(error){
        console.error('Update error:', error);
        return null;
    }
}