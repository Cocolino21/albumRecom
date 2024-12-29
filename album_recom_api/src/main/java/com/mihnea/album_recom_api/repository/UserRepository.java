package com.mihnea.album_recom_api.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.mihnea.album_recom_api.model.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    public Optional<User> findByUsername(String username);
    public Optional<User> findByEmail(String email);
    public Boolean existsByUsername(String username);
    public Boolean existsByEmail(String email);
    public Optional<User> findFirstByUsername(String username);

    @Query(value="select following_id from user_following where user_id=:id1 order by user_id limit 15",nativeQuery = true)
    public List<Integer> findUserFollowingIdsByUser_id(@Param("id1") Integer id);

    @Query(value="select * from users where user_id=:id1",nativeQuery = true)
    public User getUserByUser_id(@Param("id1") Integer id);

    @Transactional
    @Modifying(clearAutomatically = true)  // Add clearAutomatically
    @Query(value = "update users set username = :username1, email = :email1, " +
            "user_profile_picture_url = :imgUrl1 where user_id = :id1", nativeQuery = true)
    int updateUser(@Param("id1") Integer id, @Param("username1") String username, @Param("email1") String email, @Param("imgUrl1") String imgUrl);
}
    //public Optional<List<User>> findFriendListById(Integer id);


