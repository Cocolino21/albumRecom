package com.mihnea.album_recom_api.dto;

import com.mihnea.album_recom_api.model.Album;
import com.mihnea.album_recom_api.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDto {
    private Integer reviewId;
    private String content;
    private Integer rating;
    private UserDto reviewer;
    private AlbumDto reviewedAlbum;
    private LocalDateTime reviewDate;
}
