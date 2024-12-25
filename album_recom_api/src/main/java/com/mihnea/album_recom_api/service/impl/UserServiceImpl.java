package com.mihnea.album_recom_api.service.impl;

import com.mihnea.album_recom_api.dto.RegistrationDto;
import com.mihnea.album_recom_api.exceptions.auth.EmailRegistered;
import com.mihnea.album_recom_api.exceptions.auth.UsernameExists;
import com.mihnea.album_recom_api.model.User;
import com.mihnea.album_recom_api.repository.UserRepository;
import com.mihnea.album_recom_api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserServiceImpl implements UserService {


    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository,PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;

    }
    @Override
    public void registerUser(RegistrationDto registrationDto) {
        User user = mapToUser(registrationDto);
        if(userRepository.existsByUsername(user.getUsername())) {
            throw new UsernameExists("Username already exists");
        } else if (userRepository.existsByEmail(user.getEmail())) {
            throw new EmailRegistered("Email already registered");
        }
        userRepository.save(user);

    }
    private User mapToUser(RegistrationDto registrationDto) {
        User user = new User();
        user.setUsername(registrationDto.getUsername());
        user.setPassword(passwordEncoder.encode(registrationDto.getPassword()));
        user.setEmail(registrationDto.getEmail());
        return user;
    }

}
