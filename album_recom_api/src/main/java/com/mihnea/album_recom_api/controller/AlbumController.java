package com.mihnea.album_recom_api.controller;

import com.mihnea.album_recom_api.dto.AlbumDto;
import com.mihnea.album_recom_api.dto.SongDto;
import com.mihnea.album_recom_api.model.Album;
import com.mihnea.album_recom_api.service.AlbumService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/api/albums")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AlbumController {

    private final AlbumService albumService;

    public AlbumController(AlbumService albumService) {
        this.albumService = albumService;
    }

    @GetMapping("/all")
    public List<AlbumDto> getAlbums() {
        return albumService.findAllAlbums();
    }

    @GetMapping("/recent")
    public List<AlbumDto> getMostRecentAlbums() {
        return albumService.findAllMostRecent();
    }

    @GetMapping("/album={id}")
    public AlbumDto getAlbumById(@PathVariable Integer id) {
        return albumService.findAlbumById(id);
    }




    @GetMapping("/search")
    public List<AlbumDto> getAlbumsByTitle(@RequestParam String title) {
        return albumService.findAlbumByTitle(title);
    }

    @PostMapping("")
    public void createAlbum(@RequestBody AlbumDto albumDto) {
        albumService.save(albumDto);
    }



}
