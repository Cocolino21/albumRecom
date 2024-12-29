package com.mihnea.album_recom_api.controller;

import com.mihnea.album_recom_api.dto.RegistrationDto;
import com.mihnea.album_recom_api.dto.UserDto;
import com.mihnea.album_recom_api.exceptions.auth.EmailRegistered;
import com.mihnea.album_recom_api.exceptions.auth.UsernameExists;
import com.mihnea.album_recom_api.service.AlbumService;
import com.mihnea.album_recom_api.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users/")
@CrossOrigin(origins = "http://localhost:5173",allowCredentials = "true")
public class UserController {

    private final UserService userService;
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("my_profile")
    public UserDto getCurrentLoggedUser(HttpServletRequest request){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return userService.getUserByUsername(authentication.getName());
    }

    @PostMapping("register")
    public ResponseEntity<?> registerUser(@RequestBody RegistrationDto user){
        try {
            userService.registerUser(user);
            //TODO REDIRECT IF REGISTRATION SUCCESSFUL
            return ResponseEntity.ok().build();
        }catch (EmailRegistered erError){
            //TODO REDIRECT IF IF EMAIL ALREADY REGISTERED
        }
        catch(UsernameExists ueError){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            //TODO REDIRECT IF USERNAME EXIST
        }
        return ResponseEntity.status(HttpStatus.IM_USED).build();
    }

    @GetMapping("/getFriendList/user={id}&name_starts_with={name}")
    public List<UserDto> getFollowingList(@PathVariable("id") Integer id, @PathVariable("name") String name){
            return userService.getFollowingList(id, name);
    }


    @PostMapping("update/user={id}")
    public ResponseEntity<?> updateUser(@PathVariable("id") int id,@RequestBody UserDto user){
        try {

            user.setUser_id(id);
            userService.updateUser(user);
            //TODO REDIRECT IF REGISTRATION SUCCESSFUL
            return ResponseEntity.ok().build();
        }catch (EmailRegistered erError){
            //TODO REDIRECT IF IF EMAIL ALREADY REGISTERED
        }
        catch(UsernameExists ueError){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            //TODO REDIRECT IF USERNAME EXIST
        }
        return ResponseEntity.status(HttpStatus.IM_USED).build();
    }



}
