package com.mihnea.album_recom_api.service.impl;

import com.mihnea.album_recom_api.dto.Mappers.ReviewToReviewDto;
import com.mihnea.album_recom_api.dto.ReviewDto;
import com.mihnea.album_recom_api.repository.ReviewRepository;
import com.mihnea.album_recom_api.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;

    @Autowired
    public ReviewServiceImpl(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }


    @Override
    public ReviewDto getReviewById(Integer id) {
        return ReviewToReviewDto.mapReviewToReviewDto(reviewRepository.findById(id).orElseThrow(() -> new RuntimeException()));
    }

    @Override
    public List<ReviewDto> getReviewsByAlbumId(Integer albumId) {
        return reviewRepository.findReviewByAlbumId(albumId)
                .stream()
                .map(ReviewToReviewDto::mapReviewToReviewDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ReviewDto> getReviewsByUserId(Integer userId) {
        return reviewRepository.findReviewByUserId(userId)
                .stream()
                .map(ReviewToReviewDto::mapReviewToReviewDto)
                .toList();

    }
}
