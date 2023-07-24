package com.example.Strange505.user.repository;

import com.example.Strange505.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByVerification(String verification);
    Optional<User> findByEmail(String email);
}
