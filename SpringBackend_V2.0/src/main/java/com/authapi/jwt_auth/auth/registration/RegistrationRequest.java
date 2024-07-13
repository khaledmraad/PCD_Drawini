package com.authapi.jwt_auth.auth.registration;

import lombok.*;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
@Data
@Builder
public class RegistrationRequest {
    private final String firstname;
    private final String lastname;
    private final String email;
    private final String password;
}
