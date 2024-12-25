package com.mihnea.album_recom_api.service.impl;

import com.mihnea.album_recom_api.dto.AlbumDto;
import com.mihnea.album_recom_api.model.Album;
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
        return albumRepository.findAll().stream().map(x -> mapToAlbumDto(x)).collect(Collectors.toList());
    }

    @Override
    public void save(AlbumDto albumDto) {
        albumRepository.save(mapToAlbum(albumDto));
    }

    @Override
    public List<AlbumDto> findAlbumByTitle(String title) {
        return albumRepository.findByNameStartingWith(title).stream().map(x -> mapToAlbumDto(x)).collect(Collectors.toList());
    }

    private AlbumDto mapToAlbumDto(Album album) {
        AlbumDto albumDto = new AlbumDto();
        albumDto.setAlbumId(album.getAlbumId());
        albumDto.setAlbumName(album.getAlbumName());
        albumDto.setAlbumRating(album.getAlbumRating());
        albumDto.setAlbumDuration(album.getAlbumDuration());
        albumDto.setAlbumArtists(album.getAlbumArtists());
        albumDto.setAlbumCoverImageUrl(album.getAlbumCoverImageUrl());
        albumDto.setReviews(album.getReviews());
        albumDto.setSongs(album.getSongs());
        albumDto.setAlbumReviewNumber(album.getAlbumReviewNumber());
        albumDto.setAlbumGenre(album.getAlbumGenre());
        albumDto.setAlbumReleaseDate(album.getAlbumReleaseDate());
        albumDto.setAlbumRating(album.getAlbumRating());
        return albumDto;
    }

    private Album mapToAlbum(AlbumDto albumDto) {
        Album album = new Album();
        album.setAlbumId(albumDto.getAlbumId());
        album.setAlbumName(albumDto.getAlbumName());
        album.setAlbumRating(albumDto.getAlbumRating());
        album.setAlbumDuration(albumDto.getAlbumDuration());
        album.setAlbumArtists(albumDto.getAlbumArtists());
        album.setAlbumCoverImageUrl(albumDto.getAlbumCoverImageUrl());
        album.setReviews(albumDto.getReviews());
        album.setSongs(albumDto.getSongs());
        album.setAlbumReviewNumber(albumDto.getAlbumReviewNumber());
        album.setAlbumGenre(albumDto.getAlbumGenre());
        album.setAlbumRating(albumDto.getAlbumRating());
        album.setAlbumReleaseDate(albumDto.getAlbumReleaseDate());
        album.setAlbumRating(albumDto.getAlbumRating());
        return album;
    }



}
