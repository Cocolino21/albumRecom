package com.mihnea.album_recom_api.controller;


import com.mihnea.album_recom_api.dto.ReviewDto;
import com.mihnea.album_recom_api.model.Review;
import com.mihnea.album_recom_api.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/album={album_id}")
    public List<ReviewDto> getReviewsByAlbum(@PathVariable("album_id") Integer albumId) {
        return reviewService.getReviewsByAlbumId(albumId);
    }

    @GetMapping("/user={user_id}")
    public List<ReviewDto> getReviewsByUser(@PathVariable("user_id") Integer userId) {
        return reviewService.getReviewsByUserId(userId);
    }
}
