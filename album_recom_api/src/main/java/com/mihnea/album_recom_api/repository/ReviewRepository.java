package com.mihnea.album_recom_api.repository;

import com.mihnea.album_recom_api.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {

    @Query(value="select * from review r where r.album_id=:a_id order by r.review_date desc limit 100",nativeQuery = true)
    public List<Review> findReviewByAlbumId(@Param("a_id")Integer albumId);

    @Query(value="select * from review r where r.user_id =:uid order by r.review_date desc limit 100",nativeQuery = true)
    public List<Review> findReviewByUserId(@Param("uid")Integer userId);


}
