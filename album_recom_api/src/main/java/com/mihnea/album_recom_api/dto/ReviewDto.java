package com.mihnea.album_recom_api.dto;

import com.mihnea.album_recom_api.model.Album;
import com.mihnea.album_recom_api.model.User;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ReviewDto {
    private Integer reviewId;
    private String content;
    private Integer rating;
    private User reviewer;
    private Album reviewedAlbum;
}
