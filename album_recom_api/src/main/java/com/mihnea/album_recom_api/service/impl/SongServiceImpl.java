package com.mihnea.album_recom_api.service.impl;

import com.mihnea.album_recom_api.dto.Mappers.SongToSongDto;
import com.mihnea.album_recom_api.dto.SongDto;
import com.mihnea.album_recom_api.model.Song;
import com.mihnea.album_recom_api.repository.SongRepository;
import com.mihnea.album_recom_api.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SongServiceImpl implements SongService {

    private final SongRepository songRepository;

    @Autowired
    public SongServiceImpl(SongRepository songRepository) {
        this.songRepository = songRepository;
    }


    @Override
    public List<SongDto> getSongsByAlbumId(Integer albumId) {
        return songRepository.findSongsByAlbumId(albumId).stream()
                .map(SongToSongDto::mapSongToSongDto)
                .toList();
    }
}
