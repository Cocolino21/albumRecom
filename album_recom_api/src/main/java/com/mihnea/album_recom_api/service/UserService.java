package com.mihnea.album_recom_api.service;

import com.mihnea.album_recom_api.dto.RegistrationDto;
import com.mihnea.album_recom_api.model.User;
import com.mihnea.album_recom_api.repository.UserRepository;
import org.springframework.stereotype.Service;



public interface UserService {
    void registerUser(RegistrationDto registrationDto);
}
