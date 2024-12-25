package com.mihnea.album_recom_api.exceptions.auth;

public class EmailRegistered extends RuntimeException{
    public EmailRegistered(String message) {
        super(message);
    }
}
