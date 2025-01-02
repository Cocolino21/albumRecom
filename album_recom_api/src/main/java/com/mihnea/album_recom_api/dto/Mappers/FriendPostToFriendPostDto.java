package com.mihnea.album_recom_api.dto.Mappers;

import com.mihnea.album_recom_api.dto.AlbumDto;
import com.mihnea.album_recom_api.dto.FriendPostDto;
import com.mihnea.album_recom_api.dto.UserDto;
import com.mihnea.album_recom_api.model.FriendPost;

public class FriendPostToFriendPostDto {


    public static FriendPostDto mapFrinedPostToFriendPostDto(FriendPost friendPost) {
        FriendPostDto friendPostDto = new FriendPostDto();
        friendPostDto.setFriendPostId(friendPost.getFriendPostId());
        friendPostDto.setUser(UserToUserDto.mapUserToUserDto(friendPost.getUser()));
        friendPostDto.setPoster(UserToUserDto.mapUserToUserDto(friendPost.getPoster()));
        friendPostDto.setAlbum(AlbumToAlbumDto.mapAlbumToAlbumDto(friendPost.getAlbum()));
        friendPostDto.setComment(friendPost.getComment());
        friendPostDto.setImageUrl(friendPost.getImageUrl());
        friendPostDto.setPostDate(friendPost.getPostDate());
        return friendPostDto;
    }

    public static FriendPost mapFriendPostDtoToFriendPost(FriendPostDto friendPostDto) {
        FriendPost friendPost = new FriendPost();
        friendPost.setUser(UserToUserDto.mapUserDtoToUser(friendPostDto.getUser()));
        friendPost.setPoster(UserToUserDto.mapUserDtoToUser(friendPostDto.getPoster()));
        friendPost.setComment(friendPostDto.getComment());
        friendPost.setImageUrl(friendPostDto.getImageUrl());
        friendPost.setAlbum(AlbumToAlbumDto.mapAlbumDtoToAlbum(friendPostDto.getAlbum()));
        friendPost.setPostDate(friendPostDto.getPostDate());
        return friendPost;
    }
}
