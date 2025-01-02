package com.mihnea.album_recom_api.service;

import com.mihnea.album_recom_api.dto.RegistrationDto;
import com.mihnea.album_recom_api.dto.UserDto;
import com.mihnea.album_recom_api.model.User;
import com.mihnea.album_recom_api.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;


public interface UserService {
    void registerUser(RegistrationDto registrationDto);
    public UserDto getUserByUsername(String username);
    public List<UserDto> getFollowingForUser(Integer userId);
    void updateUser(UserDto userDto);
    public List<UserDto> getFollowingList(Integer userId, String name);
    public List<UserDto> getFriendReqList(Integer userId);
    public UserDto getUserById(Integer userId);
    public void followUser(Integer userId, Integer followingId);
    public boolean checkIfUserIsFollowing(Integer userId, Integer followingId);
}
