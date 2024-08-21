package com.authapi.jwt_auth.demo;


import com.authapi.jwt_auth.auth.AuthenticationResponse;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/v1/verifie-token")
public class DemoController {

    @GetMapping
    public ValidTokenResponse hello() {
        return new ValidTokenResponse().builder()
                .valid_token(1)
                .build();
    }


}
