package com.mihnea.album_recom_api.service;

import com.mihnea.album_recom_api.dto.AlbumDto;
import com.mihnea.album_recom_api.model.Album;
import com.mihnea.album_recom_api.model.Song;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


public interface AlbumService {
    public List<AlbumDto> findAllAlbums();
    public void save(AlbumDto albumDto);
    public List<AlbumDto> findAlbumByTitle(String title);
    public List<AlbumDto> findAllMostRecent();
    public AlbumDto findAlbumById(Integer id);
}
