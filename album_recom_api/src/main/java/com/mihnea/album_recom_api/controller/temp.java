package com.mihnea.album_recom_api.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
@CrossOrigin
public class temp {

    @GetMapping("")
    public String normal() {
        return "normal";
    }

    @GetMapping("mata2")
    public String mata2() {
        return "Mata2";
    }
}
