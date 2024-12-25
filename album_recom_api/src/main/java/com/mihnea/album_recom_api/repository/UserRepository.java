package com.mihnea.album_recom_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.mihnea.album_recom_api.model.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    public Optional<User> findByUsername(String username);
    public Optional<User> findByEmail(String email);
    public Boolean existsByUsername(String username);
    public Boolean existsByEmail(String email);
    public Optional<User> findFirstByUsername(String username);

}
