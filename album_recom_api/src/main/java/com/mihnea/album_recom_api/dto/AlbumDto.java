package com.mihnea.album_recom_api.dto;

import com.mihnea.album_recom_api.model.Artist;
import com.mihnea.album_recom_api.model.Review;
import com.mihnea.album_recom_api.model.Song;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlbumDto {
    private Integer albumId;
    private String albumName;
    private Double albumDuration;
    private String albumCoverImageUrl;
    private Double albumRating;
    private Integer albumReviewNumber;
    private LocalDateTime albumReleaseDate;
    private Set<Song> songs;
    private Set<Artist> albumArtists;
    private List<Review> reviews;
    private String albumGenre;
}
