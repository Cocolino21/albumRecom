package com.mihnea.album_recom_api.dto;

import lombok.Data;

@Data
public class RegistrationDto {
    private String username;
    private String password;
    private String email;
    private String userProfilePictureUrl;
}
