package com.authapi.jwt_auth.controller;

import com.authapi.jwt_auth.auth.AuthenticationResponse;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/v1/projects")
public class ProjectsController {

    @GetMapping
    public String hello() {
        return "Hello";
    }

}
