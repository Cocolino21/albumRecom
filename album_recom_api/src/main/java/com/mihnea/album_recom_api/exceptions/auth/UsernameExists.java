package com.mihnea.album_recom_api.exceptions.auth;

public class UsernameExists extends RuntimeException {
  public UsernameExists(String message) {
    super(message);
  }
}
