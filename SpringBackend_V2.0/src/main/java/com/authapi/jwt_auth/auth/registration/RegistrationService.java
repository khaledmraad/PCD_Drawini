package com.authapi.jwt_auth.auth.registration;


import com.authapi.jwt_auth.auth.AuthenticationService;
import com.authapi.jwt_auth.auth.emailSender.EmailService;
import com.authapi.jwt_auth.auth.registration.token.ConfirmationToken;
import com.authapi.jwt_auth.auth.registration.token.ConfirmationTokenService;
import com.authapi.jwt_auth.config.JwtService;
import com.authapi.jwt_auth.user.Role;
import com.authapi.jwt_auth.user.User;
import com.authapi.jwt_auth.user.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;

import java.text.MessageFormat;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@AllArgsConstructor
public class RegistrationService {

    private final ConfirmationTokenService confirmationTokenService;

    private final AuthenticationService authenticationService;

    final UserRepository repository;

    private final PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();

    private final EmailService emailService;




    private EmailValidator emailValidator;
    public String register(RegistrationRequest request) {
        boolean isValidEmail=emailValidator.test(request.getEmail());

        if (!isValidEmail){
            throw new IllegalStateException("email is not valid");

        }

        System.out.println(request.getPassword());

        var user= User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .enable(0)
                .build();

        boolean userExists=repository
                .findByEmail(user.getEmail())
                .isPresent();
        if (userExists){
            throw new IllegalStateException("user already exists");

        }

        repository.save(user);

        /*var jwtToken=jwtService.generateToken(user);
        return new AuthenticationResponse().builder()
                .token(jwtToken)
                .build();*/

        String token = UUID.randomUUID().toString();

        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                user
        );

        confirmationTokenService.saveConfirmationToken(
                confirmationToken);

        Context context = new Context();
        context.setVariable("token", token);

        emailService.sendEmailWithHtmlTemplate(request.getEmail(), "wtf", "email-template",(Context) context);



        return token;
    }


    @Transactional
    public String confirmToken(String token) {
        ConfirmationToken confirmationToken = confirmationTokenService
                .getToken(token)
                .orElseThrow(() ->
                        new IllegalStateException("token not found"));

        if (confirmationToken.getConfirmedAt() != null) {
            throw new IllegalStateException("email already confirmed");
        }

        LocalDateTime expiredAt = confirmationToken.getExpiresAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("token expired");
        }

        confirmationTokenService.setConfirmedAt(token);
        authenticationService.enableAppUser(
                confirmationToken.getUser().getEmail());
        return "confirmed";
    }
}
