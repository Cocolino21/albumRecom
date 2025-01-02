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
public class FriendPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int friendPostId;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "poster_id")
    private User poster;
    @ManyToOne
    @JoinColumn(name = "album_id")
    private Album album;
    @Column(nullable = false, length = 500)
    private String comment;
    private String imageUrl;
    private LocalDateTime postDate;

}
