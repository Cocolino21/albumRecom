package com.mihnea.album_recom_api.service;

import com.mihnea.album_recom_api.dto.SongDto;
import com.mihnea.album_recom_api.model.Song;

import java.util.List;

public interface SongService {

    public List<SongDto> getSongsByAlbumId(Integer albumId);
}
