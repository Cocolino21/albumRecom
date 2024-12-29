package com.mihnea.album_recom_api.repository;

import com.mihnea.album_recom_api.model.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SongRepository extends JpaRepository<Song,Integer> {

    @Query(value="select * from song where album_id=:a_id",nativeQuery = true)
    public List<Song> findSongsByAlbumId(@Param("a_id")Integer albumId);

}
