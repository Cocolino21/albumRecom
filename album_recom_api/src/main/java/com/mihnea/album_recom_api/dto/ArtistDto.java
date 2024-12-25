package com.mihnea.album_recom_api.dto;

import com.mihnea.album_recom_api.model.Album;
import com.mihnea.album_recom_api.model.Song;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Builder
@Data
public class ArtistDto {
    private Integer artistId;
    private String artistName;
    private String artistImageUrl;
    private Integer artistAge;
    private Set<Album> artistAlbums = new HashSet<>();
    private Set<Song> artistSongs = new HashSet<>();
    

}
