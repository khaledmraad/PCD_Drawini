package com.authapi.jwt_auth.auth;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {


    private final AuthenticationService service;


    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> register (
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));

    }

//    @PostMapping("/verifie-token")
//    public ResponseEntity<AuthenticationResponse> verifyToken (
//            @RequestBody AuthenticationRequest request
//    ){
//        final String authHeader = request.get;
//
//        final String jwt;
//
//        final String userEmail;
//
//        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
//            System.out.println(authHeader);
//            filterChain.doFilter(request, response);
//            return;
//        }
//
//        jwt= authHeader.substring(7);
//
//        userEmail= jwtService.extractUserName(jwt);
//
//        System.out.println("userEmail: " + userEmail);
//
//        if(userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//
//            UserDetails userDetails=this.userDetailsService.loadUserByUsername(userEmail);
//
//            if (jwtService.isTokenValid(jwt, userDetails)) {
//                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
//                        userDetails,
//                        null,
//                        userDetails.getAuthorities()
//                );
//
//                authToken.setDetails(
//                        new WebAuthenticationDetailsSource().buildDetails(request)
//                );
//
//                SecurityContextHolder.getContext().setAuthentication(authToken);
//
//
//            }
//
//        }
//    }



}
