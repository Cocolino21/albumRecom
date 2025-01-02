package com.mihnea.album_recom_api.service.impl;

import com.mihnea.album_recom_api.dto.FriendPostDto;
import com.mihnea.album_recom_api.dto.Mappers.FriendPostToFriendPostDto;
import com.mihnea.album_recom_api.repository.FriendPostRepository;
import com.mihnea.album_recom_api.service.FriendPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class FriendPostServiceImpl implements FriendPostService {

    private final FriendPostRepository friendPostRepository;

    @Autowired
    public FriendPostServiceImpl(FriendPostRepository friendPostRepository) {
        this.friendPostRepository = friendPostRepository;
    }

    @Override
    public List<FriendPostDto> getUserWall(Integer userId) {
        return friendPostRepository.findWallForUser(userId)
                .stream()
                .map(FriendPostToFriendPostDto::mapFrinedPostToFriendPostDto)
                .toList();
    }

    @Override
    public void savePost(FriendPostDto friendPostDto) {
        friendPostRepository.save(FriendPostToFriendPostDto.mapFriendPostDtoToFriendPost(friendPostDto));
    }
}
