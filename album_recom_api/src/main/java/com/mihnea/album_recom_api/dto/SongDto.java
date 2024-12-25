package com.mihnea.album_recom_api.dto;

import com.mihnea.album_recom_api.model.Album;
import com.mihnea.album_recom_api.model.Artist;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;
@Builder
@Data
public class SongDto {
    private Integer songId;
    private String songTitle;
    private Double songDuration;
    private Integer songPictureUrl;
    private Album album;
    private Set<Artist> songArtists = new HashSet<>();
}
