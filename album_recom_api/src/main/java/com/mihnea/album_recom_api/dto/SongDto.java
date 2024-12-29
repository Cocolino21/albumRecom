package com.mihnea.album_recom_api.dto;

import com.mihnea.album_recom_api.model.Album;
import com.mihnea.album_recom_api.model.Artist;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SongDto {
    private Integer songId;
    private String songTitle;
    private Double songDuration;
    private Integer songSourceUrl;
    private String songAudioUrl;
}
