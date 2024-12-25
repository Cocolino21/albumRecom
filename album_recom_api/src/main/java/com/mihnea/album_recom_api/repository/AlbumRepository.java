package com.mihnea.album_recom_api.repository;

import com.mihnea.album_recom_api.model.Album;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface AlbumRepository extends JpaRepository<Album, Integer> {
    @Query(value="select * from album a where a.album_name like lower(concat(:namePrefix, '%'))",nativeQuery=true)
    List<Album> findByNameStartingWith(@Param("namePrefix")String name);
}
