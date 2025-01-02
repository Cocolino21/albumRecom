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

    @Query(value="select following_id from user_following where user_id=:id1 order by user_id",nativeQuery = true)
    public List<Integer> findUserFollowingIdsByUser_id(@Param("id1") Integer id);

    @Query(value="SELECT u1.user_id " +
            "FROM user_following u1 " +
            "LEFT JOIN user_following u2 " +
            "ON u1.user_id = u2.following_id AND u1.following_id = u2.user_id " +
            "WHERE u1.following_id = :id1 AND u2.user_id IS NULL",nativeQuery = true)
    public List<Integer> findUserFriendRequestIdsByUser_id(@Param("id1")Integer id);

    @Query(value="select * from users where user_id=:id1",nativeQuery = true)
    public User getUserByUser_id(@Param("id1") Integer id);

    @Query(value="select * from users where user_id=:id1 and lower(username) like lower(concat(:usrn,'%')) limit 9",nativeQuery = true)
    public User getUserByUser_idAndUsernameLike(@Param("id1") Integer id, @Param("usrn") String username);


    @Transactional
    @Modifying(clearAutomatically = true)  // Add clearAutomatically
    @Query(value = "update users set username = :username1, email = :email1, " +
            "user_profile_picture_url = :imgUrl1 where user_id = :id1", nativeQuery = true)
    int updateUser(@Param("id1") Integer id, @Param("username1") String username, @Param("email1") String email, @Param("imgUrl1") String imgUrl);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value="insert into user_following values (:u_id,:f_id)",nativeQuery = true)
    public void UserFollow(@Param("u_id")Integer userId,@Param("f_id") Integer followingId);

    @Query(value="select count(*) from user_following where user_id=:u_id and following_id=:f_id;",nativeQuery = true)
    public int checkIfUserIsFollowing(@Param("u_id")Integer userId,@Param("f_id")Integer followingId);

}

    //public Optional<List<User>> findFriendListById(Integer id);


