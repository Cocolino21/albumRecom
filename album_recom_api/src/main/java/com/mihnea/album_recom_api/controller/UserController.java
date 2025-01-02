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

    @GetMapping("/user={id}")
    public UserDto getUserById(@PathVariable Integer id){
        return userService.getUserById(id);
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

    @GetMapping("/get_following_list/user={id}&name_starts_with={name}")
    public List<UserDto> getFollowingList(@PathVariable("id") Integer id, @PathVariable("name") String name){
            return userService.getFollowingList(id, name);
    }

    @GetMapping("/get_friend_req_list/user={id}")
    public List<UserDto> getFriendList(@PathVariable("id") Integer id){
        return userService.getFriendReqList(id);
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

    @PostMapping("/follow/user={followingId}")
    public ResponseEntity<?> followUser(@PathVariable Integer followingId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        userService.followUser( userService.getUserByUsername(authentication.getName()).getUser_id(), followingId);
        return ResponseEntity.ok().build();
    }



    @GetMapping("/follow/check/user={followingId}")
    public ResponseEntity<?> checkFollowing(@PathVariable Integer followingId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return ResponseEntity.ok( userService.checkIfUserIsFollowing( userService.getUserByUsername(authentication.getName()).getUser_id(), followingId));

    }

    @GetMapping("/friendship/check/user={followingId}")
    public ResponseEntity<?> checkFriendship(@PathVariable Integer followingId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Integer myUid = userService.getUserByUsername(authentication.getName()).getUser_id();
        return ResponseEntity.ok( userService.checkIfUserIsFollowing( myUid, followingId) && userService.checkIfUserIsFollowing(followingId, myUid));

    }



}
