package com.mihnea.album_recom_api.controller;

import com.mihnea.album_recom_api.dto.FriendPostDto;
import com.mihnea.album_recom_api.service.FriendPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class FriendPostController {

    private final FriendPostService friendPostService;

    @Autowired
    public FriendPostController(FriendPostService friendPostService) {
        this.friendPostService = friendPostService;
    }

    @GetMapping("/wall_user={id}")
    public List<FriendPostDto> getWallUser(@PathVariable Integer id) {
        return friendPostService.getUserWall(id);
    }

    @PostMapping("/post_wall")
    public void postWall(@RequestBody FriendPostDto friendPostDto) {
        friendPostService.savePost(friendPostDto);
    }

}
