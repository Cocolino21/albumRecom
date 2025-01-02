package com.mihnea.album_recom_api.dto;


import com.mihnea.album_recom_api.model.Album;
import com.mihnea.album_recom_api.model.User;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FriendPostDto {
    private int friendPostId;
    private UserDto user;
    private UserDto poster;
    private AlbumDto album;
    private String comment;
    private String imageUrl;
    private LocalDateTime postDate;
}
