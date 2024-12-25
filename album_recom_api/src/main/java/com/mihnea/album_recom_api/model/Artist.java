package com.mihnea.album_recom_api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
public class Artist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer artistId;
    @Column(nullable = false)
    private String artistName;
    private String artistImageUrl;
    private Integer artistAge;

    @ManyToMany
    @JoinTable(
            name = "album_artist",
            joinColumns = @JoinColumn(name = "album_id"),
            inverseJoinColumns = @JoinColumn(name = "artist_id")
    )
    private Set<Album> artistAlbums = new HashSet<>();


    @ManyToMany(mappedBy = "songArtists")
    private Set<Song> artistSongs = new HashSet<>();

}
