package com.mihnea.album_recom_api.dto.Mappers;

import com.mihnea.album_recom_api.dto.AlbumDto;
import com.mihnea.album_recom_api.model.Album;

import java.time.LocalDateTime;

public class AlbumToAlbumDto {

    public static AlbumDto mapAlbumToAlbumDto(Album album) {
        AlbumDto albumDto = new AlbumDto();
        albumDto.setAlbumId(album.getAlbumId());
        albumDto.setAlbumName(album.getAlbumName());
        albumDto.setAlbumDuration(album.getAlbumDuration());
        albumDto.setAlbumCoverImageUrl(album.getAlbumCoverImageUrl());
        albumDto.setAlbumRating(album.getAlbumRating());
        albumDto.setAlbumReviewNumber(album.getAlbumReviewNumber());
        albumDto.setAlbumReleaseDate(album.getAlbumReleaseDate());
        albumDto.setAlbumGenre(album.getAlbumGenre());
        return albumDto;
    }

    public static Album mapAlbumDtoToAlbum(AlbumDto albumDto) {
        Album album = new Album();
        album.setAlbumId(albumDto.getAlbumId());
        album.setAlbumName(albumDto.getAlbumName());
        album.setAlbumRating(albumDto.getAlbumRating());
        album.setAlbumDuration(albumDto.getAlbumDuration());
        album.setAlbumCoverImageUrl(albumDto.getAlbumCoverImageUrl());
        album.setAlbumReviewNumber(albumDto.getAlbumReviewNumber());
        album.setAlbumGenre(albumDto.getAlbumGenre());
        album.setAlbumRating(albumDto.getAlbumRating());
        album.setAlbumReleaseDate(albumDto.getAlbumReleaseDate());
        album.setAlbumRating(albumDto.getAlbumRating());
        return album;
    }
}
