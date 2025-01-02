package com.mihnea.album_recom_api.service;


import com.mihnea.album_recom_api.dto.ReviewDto;
import com.mihnea.album_recom_api.model.Review;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReviewService {

    public ReviewDto getReviewById(Integer id);
    public List<ReviewDto> getReviewsByAlbumId(Integer albumId);
    public List<ReviewDto> getReviewsByUserId(Integer userId);
}
