package com.mihnea.album_recom_api.service.impl;

import com.mihnea.album_recom_api.controller.AuthController;
import com.mihnea.album_recom_api.dto.RegistrationDto;
import com.mihnea.album_recom_api.dto.UserDto;
import com.mihnea.album_recom_api.exceptions.auth.EmailRegistered;
import com.mihnea.album_recom_api.exceptions.auth.UsernameExists;
import com.mihnea.album_recom_api.model.User;
import com.mihnea.album_recom_api.repository.UserRepository;
import com.mihnea.album_recom_api.service.UserService;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.mihnea.album_recom_api.dto.Mappers.UserToUserDto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.mihnea.album_recom_api.dto.Mappers.UserToUserDto.mapUserToUserDto;


@Service
@Transactional
public class UserServiceImpl implements UserService {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository,PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;

    }
    @Override
    public void registerUser(RegistrationDto registrationDto) {
        User user = UserToUserDto.mapRegistrationDtoToUser(registrationDto, passwordEncoder);
        if(userRepository.existsByUsername(user.getUsername())) {
            throw new UsernameExists("Username already exists");
        } else if (userRepository.existsByEmail(user.getEmail())) {
            throw new EmailRegistered("Email already registered");
        }
        userRepository.save(user);

    }

    @Override
    public UserDto getUserByUsername(String username) throws UsernameNotFoundException {
        return mapUserToUserDto(userRepository.findFirstByUsername(username).orElseThrow(() -> new UsernameNotFoundException(username)));

    }

    @Override
    public List<UserDto> getFollowingForUser(Integer userId) {
        return List.of();
    }

    @Override
    @Transactional
    public void updateUser(UserDto updateDto) {
        User user = UserToUserDto.mapUserDtoToUser(updateDto);

        User existingUser = userRepository.findById(user.getUser_id())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        if (!existingUser.getUsername().equals(user.getUsername())
                && userRepository.existsByUsername(user.getUsername())) {
            throw new UsernameExists("Username already exists");
        }
        if (!existingUser.getEmail().equals(user.getEmail())
                && userRepository.existsByEmail(user.getEmail())) {
            throw new EmailRegistered("Email already registered");
        }

        // Store old username to check if it changed
        String oldUsername = existingUser.getUsername();
        int updatedRows = userRepository.updateUser(user.getUser_id(), user.getUsername(), user.getEmail(), user.getUserProfilePictureUrl());
        if (updatedRows > 0) {
            if (!oldUsername.equals(user.getUsername())) {
                Authentication auth = SecurityContextHolder.getContext().getAuthentication();
                List<GrantedAuthority> authorities = new ArrayList<>(auth.getAuthorities());
                Authentication newAuth = new UsernamePasswordAuthenticationToken(user.getUsername(), auth.getCredentials(), authorities);
                SecurityContextHolder.getContext().setAuthentication(newAuth);
            }
        } else {
            logger.error("No rows were updated for user ID: {}", user.getUser_id());
            throw new RuntimeException("Failed to update user");
        }
    }

    @Override
    public List<UserDto> getFollowingList(Integer userId, String name) {
        logger.info("Following list found sdad user ID: {}", userId);

        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        logger.info("Following list found for user ID: {}", userId);
        return  userRepository.findUserFollowingIdsByUser_id(userId)
                .stream()
                .map(x -> UserToUserDto
                        .mapUserToUserDto(userRepository.getUserByUser_id(x)))
                .filter(x -> x.getUsername().startsWith(name))
                .limit(9)
                .toList();
    }

    @Override
    public List<UserDto> getFriendReqList(Integer userId) {
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return userRepository.findUserFriendRequestIdsByUser_id(userId)
                .stream()
                .map(x -> UserToUserDto
                        .mapUserToUserDto(userRepository.getUserByUser_id(x)))
                .limit(9)
                .toList();
    }

    @Override
    public UserDto getUserById(Integer userId) {
        return UserToUserDto.mapUserToUserDto(userRepository.getUserByUser_id(userId));
    }

    @Override
    @Transactional
    public void followUser(Integer userId, Integer followingId) {
        userRepository.UserFollow(userId, followingId);
    }

    @Override
    public boolean checkIfUserIsFollowing(Integer userId, Integer followingId) {
        return (userRepository.checkIfUserIsFollowing(userId, followingId)>0);
    }


}
