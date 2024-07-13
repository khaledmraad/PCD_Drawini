package com.authapi.jwt_auth.auth.registration.token;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
@Transactional
public interface ConfirmationTokenRepository
        extends JpaRepository<ConfirmationToken, Integer> {

    public Optional<ConfirmationToken> findByToken(String token);

    @Transactional
    @Modifying
    @Query("DELETE ConfirmationToken c " +
            "WHERE c.token = ?1")
    int updateConfirmedAt(String token,
                          LocalDateTime confirmedAt);

}
