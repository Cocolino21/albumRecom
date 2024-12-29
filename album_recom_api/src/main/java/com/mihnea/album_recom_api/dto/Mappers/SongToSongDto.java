package com.mihnea.album_recom_api.dto.Mappers;

import com.mihnea.album_recom_api.dto.SongDto;
import com.mihnea.album_recom_api.model.Song;

public class SongToSongDto {

    public static SongDto mapSongToSongDto(Song song) {
        SongDto songDto = new SongDto();
        songDto.setSongId(song.getSongId());
        songDto.setSongTitle(song.getSongTitle());
        songDto.setSongDuration(song.getSongDuration());
        songDto.setSongSourceUrl(song.getSongSourceUrl());
        songDto.setSongAudioUrl(song.getSongAudioUrl());
        return songDto;
    }
}
