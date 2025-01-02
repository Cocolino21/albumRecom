package com.mihnea.album_recom_api.service;

import com.mihnea.album_recom_api.dto.FriendPostDto;

import java.util.List;

public interface FriendPostService {
    public List<FriendPostDto> getUserWall(Integer userId);
    public void savePost(FriendPostDto friendPostDto);
}
