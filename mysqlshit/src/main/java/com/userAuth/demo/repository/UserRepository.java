package com.userAuth.demo.repository;

import com.userAuth.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findUserByEmail(String email);

    List<User> findUserByEmailAndPassword(String Email,String Password);

    Optional<User> findByEmail(String email);
}