package com.mihnea.album_recom_api.dto;

import com.mihnea.album_recom_api.model.FriendPost;
import com.mihnea.album_recom_api.model.Review;
import com.mihnea.album_recom_api.model.User;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Integer user_id;
    private String username;
    private String email;
    private String userProfilePictureUrl;

}
