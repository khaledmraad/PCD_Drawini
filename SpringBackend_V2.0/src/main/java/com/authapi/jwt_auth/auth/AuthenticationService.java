package com.authapi.jwt_auth.auth;


import com.authapi.jwt_auth.auth.registration.RegistrationRequest;
import com.authapi.jwt_auth.auth.registration.token.ConfirmationToken;
import com.authapi.jwt_auth.auth.registration.token.ConfirmationTokenService;
import com.authapi.jwt_auth.config.JwtService;
import com.authapi.jwt_auth.user.Role;
import com.authapi.jwt_auth.user.User;
import com.authapi.jwt_auth.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class AuthenticationService {

    final UserRepository repository;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;






    public AuthenticationResponse authenticate(AuthenticationRequest request) {

        /*authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );*/

        System.out.println(request.getEmail());
        var testUserExists = repository.findByEmail(request.getEmail());
        var user = testUserExists
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));


        if (!testUserExists.isPresent()) {
            return new AuthenticationResponse().builder()
                    .token("ur not real")
                    .responseStatus(404)
                    .build();
        };

        if (user.getEnable()==0) {
            /*throw new UsernameNotFoundException("User not found");*/
            return new AuthenticationResponse().builder()
                    .token("fkr did not confirm the email")
                    .responseStatus(401)
                    .build();
        }

        var jwtToken=jwtService.generateToken(user);
        return new AuthenticationResponse().builder()
                .responseStatus(202)
                .token(jwtToken)
                .build();

    }


    public int enableAppUser(String email) {
        return repository.enableAppUser(email);
    }



}
