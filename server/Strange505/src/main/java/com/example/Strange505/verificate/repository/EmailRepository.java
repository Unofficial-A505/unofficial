package com.example.Strange505.verificate.repository;

import com.example.Strange505.verificate.Emails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmailRepository extends JpaRepository<Emails, String> {
    Optional<Emails> findByEmail(String email);
}
