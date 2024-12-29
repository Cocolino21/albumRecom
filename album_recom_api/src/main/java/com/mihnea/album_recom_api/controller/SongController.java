package com.mihnea.album_recom_api.controller;

import com.mihnea.album_recom_api.dto.SongDto;
import com.mihnea.album_recom_api.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/songs")
@CrossOrigin(origins = "http://localhost:5173",allowCredentials = "true")
public class SongController {

    private final SongService songService;

    @Autowired
    public SongController(SongService songService) {
        this.songService = songService;
    }

    @GetMapping("/by_album={id}")
    public List<SongDto> getAlbumSongs(@PathVariable Integer id) {
        return songService.getSongsByAlbumId(id);
    }
}
