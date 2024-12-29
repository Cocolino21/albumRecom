package com.mihnea.album_recom_api.service.impl;

import com.mihnea.album_recom_api.dto.AlbumDto;
import com.mihnea.album_recom_api.dto.Mappers.AlbumToAlbumDto;
import com.mihnea.album_recom_api.model.Album;
import com.mihnea.album_recom_api.model.Song;
import com.mihnea.album_recom_api.repository.AlbumRepository;
import com.mihnea.album_recom_api.service.AlbumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AlbumServiceImpl implements AlbumService {
    private final AlbumRepository albumRepository;

    @Autowired
    public AlbumServiceImpl(AlbumRepository albumRepository) {
        this.albumRepository = albumRepository;
    }

    @Override
    public List<AlbumDto> findAllAlbums() {
        return albumRepository.findAll().stream().map(AlbumToAlbumDto::mapAlbumToAlbumDto).collect(Collectors.toList());
    }

    @Override
    public List<AlbumDto> findAllMostRecent() {
        return albumRepository
                .findTop100OrderByAlbumReleaseDateDesc()
                .stream().map(AlbumToAlbumDto::mapAlbumToAlbumDto)
                .collect(Collectors.toList());
    }

    @Override
    public AlbumDto findAlbumById(Integer id) {
       return albumRepository.findById(id).map(AlbumToAlbumDto::mapAlbumToAlbumDto).orElse(null);
    }


    @Override
    public void save(AlbumDto albumDto) {
        albumRepository.save(AlbumToAlbumDto.mapAlbumDtoToAlbum(albumDto));
    }

    @Override
    public List<AlbumDto> findAlbumByTitle(String title) {
        return albumRepository.findByNameStartingWith(title).stream().map(AlbumToAlbumDto::mapAlbumToAlbumDto).collect(Collectors.toList());
    }




}
