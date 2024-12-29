package com.mihnea.album_recom_api.dto.Mappers;

import com.mihnea.album_recom_api.dto.RegistrationDto;
import com.mihnea.album_recom_api.dto.UserDto;
import com.mihnea.album_recom_api.model.User;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.stream.Collectors;

public class UserToUserDto {

    public static UserDto mapUserToUserDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setUsername(user.getUsername());
        userDto.setEmail(user.getEmail());
        userDto.setUser_id(user.getUser_id());
        userDto.setUserProfilePictureUrl(user.getUserProfilePictureUrl());
        return userDto;
    }

    public static User mapUserDtoToUser(UserDto userDto) {
        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setUser_id(userDto.getUser_id());
        user.setUserProfilePictureUrl(userDto.getUserProfilePictureUrl());
        return user;
    }

    public static User mapRegistrationDtoToUser(RegistrationDto registrationDto, PasswordEncoder passwordEncoder) {
        User user = new User();
        user.setUsername(registrationDto.getUsername());
        user.setPassword(passwordEncoder.encode(registrationDto.getPassword()));
        user.setEmail(registrationDto.getEmail());
        if(registrationDto.getUserProfilePictureUrl() != null)
            user.setUserProfilePictureUrl(registrationDto.getUserProfilePictureUrl());
        return user;
    }
}
