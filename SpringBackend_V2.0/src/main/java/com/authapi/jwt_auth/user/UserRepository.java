package com.authapi.jwt_auth.user;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);

    Optional<User> findUserByPassword(String username);

    @Transactional
    @Modifying
    @Query("UPDATE User a " +
            "SET a.enable = 1 WHERE a.email = ?1")
    int enableAppUser(String email);
}
