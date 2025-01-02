package com.mihnea.album_recom_api.repository;

import com.mihnea.album_recom_api.model.FriendPost;
import com.mihnea.album_recom_api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendPostRepository extends JpaRepository<FriendPost, Integer> {


    @Query(value="select * from friend_post where user_id=:u_id order by post_date desc limit 1000",nativeQuery = true)
    public List<FriendPost> findWallForUser(@Param("u_id")Integer userId);

    Integer user(User user);
}
