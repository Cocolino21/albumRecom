package com.mihnea.album_recom_api.dto.Mappers;

import com.mihnea.album_recom_api.dto.ReviewDto;
import com.mihnea.album_recom_api.model.Album;
import com.mihnea.album_recom_api.model.Review;
import com.mihnea.album_recom_api.model.User;

public class ReviewToReviewDto {

    public static ReviewDto mapReviewToReviewDto(Review review) {
        ReviewDto reviewDto = new ReviewDto();
        reviewDto.setReviewId(review.getReviewId());
        reviewDto.setContent(review.getContent());
        reviewDto.setRating(review.getRating());
        reviewDto.setReviewer(UserToUserDto.mapUserToUserDto(review.getReviewer()));
        reviewDto.setReviewedAlbum(AlbumToAlbumDto.mapAlbumToAlbumDto(review.getReviewedAlbum()));
        reviewDto.setReviewDate(review.getReviewDate());
        return reviewDto;
    }
}
