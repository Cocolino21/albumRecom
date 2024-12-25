package com.mihnea.album_recom_api.dto;

import com.mihnea.album_recom_api.model.FriendPost;
import com.mihnea.album_recom_api.model.Review;
import com.mihnea.album_recom_api.model.User;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class UserDto {
    private Integer user_id;
    private String username;
    private String password;
    private String email;
    private String userProfilePictureUrl;
    private List<Review> reviews;
    private List<User> followers;
    private List<User> following;
    private List<FriendPost> friendPostsToMe;
    private List<FriendPost> myPostsToFriends;

}
