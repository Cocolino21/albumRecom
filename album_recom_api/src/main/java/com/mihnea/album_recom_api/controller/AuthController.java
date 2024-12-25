package com.mihnea.album_recom_api.controller;

import com.mihnea.album_recom_api.dto.LoginDto;
import com.mihnea.album_recom_api.dto.RegistrationDto;
import com.mihnea.album_recom_api.exceptions.auth.EmailRegistered;
import com.mihnea.album_recom_api.exceptions.auth.UsernameExists;
import com.mihnea.album_recom_api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth/")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private UserService userService;

    @Autowired
    public AuthController(UserService userService, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
    }

    @GetMapping("register")
    public ResponseEntity<?> register(){
        return ResponseEntity.ok().build();
    }

    @PostMapping("register")
    public ResponseEntity<?> registerUser(@RequestBody RegistrationDto user){
        try {
            userService.registerUser(user);
            //TODO REDIRECT IF REGISTRATION SUCCESSFUL
        }catch (EmailRegistered erError){
            //TODO REDIRECT IF IF EMAIL ALREADY REGISTERED
        }
        catch(UsernameExists ueError){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            //TODO REDIRECT IF USERNAME EXIST
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping("home")
    public String home(){
        return "Good";
    }


    @PostMapping("login")
    public ResponseEntity<String> login(@RequestBody LoginDto loginDto){
        Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(auth);
        return new ResponseEntity(auth.getName(), HttpStatus.OK);
    }


}
