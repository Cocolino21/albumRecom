package com.mihnea.album_recom_api.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
public class Album {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer albumId;
    @Column(nullable = false)
    private String albumName;
    @Column(nullable = false)
    private Double albumDuration;
    private String albumCoverImageUrl;
    private Double albumRating;
    private Integer albumReviewNumber;
    private LocalDateTime albumReleaseDate;
    private String albumGenre;


    @OneToMany(mappedBy = "album", orphanRemoval = true, cascade = CascadeType.ALL)
    private Set<Song> songs = new HashSet<>();

    @ManyToMany(mappedBy = "artistAlbums")
    private Set<Artist> albumArtists = new HashSet<>();

    @OneToMany(mappedBy = "reviewedAlbum", orphanRemoval = true, cascade = CascadeType.ALL)
    private List<Review> reviews = new ArrayList<>();






}
