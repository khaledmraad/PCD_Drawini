package com.userAuth.demo.controller;

import com.userAuth.demo.model.User;
import com.userAuth.demo.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class LoginController {
    private final UserRepository repository;

    public LoginController(UserRepository repository) {
        this.repository = repository;
    }


    @GetMapping("/hello")
    List<User> all() {
        return repository.findAll();
    }

    @PostMapping("/login")
    ResponseEntity<String> userLogin(@RequestBody User user){
        List<User> inputEmail = repository.findUserByEmailAndPassword(user.getEmail(), user.getPassword());

        if(inputEmail.isEmpty()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("user with that email dont exist");
        }

        return ResponseEntity.status(HttpStatus.OK).body((user.getEmail()));

    }


    @PostMapping("/signup")
    ResponseEntity<String> adduser(@RequestBody User newUser) {
        List<User> inputEmail = repository.findUserByEmail((newUser.getEmail()));


//        for (User u : inputEmail) {
//            System.out.println(u);
//        }
        if (!inputEmail.isEmpty()) {

            return ResponseEntity.status(HttpStatus.CONFLICT).body("user already exist");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(newUser).getEmail());

    }


//    @GetMapping("/user/{id}")
//    public ResponseEntity<User> getUser(@PathVariable("id") long id) {
//        User user = repository.findById(id)
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "user dont exist"));
//
//        return ResponseEntity.status(HttpStatus.OK).body(user);
//
//
//    }


    @GetMapping("/user/{email}")
    public ResponseEntity<String> getUserName(@PathVariable("email") String email ){
        List<User> userList=repository.findUserByEmail(email);

        if (userList.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("user dont exist");

        }

        return ResponseEntity.status(HttpStatus.OK).body(userList.get(0).getUsername());


    }




}
