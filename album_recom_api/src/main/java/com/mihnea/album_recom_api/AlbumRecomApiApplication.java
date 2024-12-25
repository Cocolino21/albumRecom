package com.mihnea.album_recom_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication

public class AlbumRecomApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(AlbumRecomApiApplication.class, args);
	}

}
