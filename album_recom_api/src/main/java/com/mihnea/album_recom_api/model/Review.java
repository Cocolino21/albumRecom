package com.mihnea.album_recom_api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer reviewId;
    private String content;
    private Integer rating;
    private LocalDateTime reviewDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User reviewer;

    @ManyToOne
    @JoinColumn(name = "album_id")
    private Album reviewedAlbum;


}
