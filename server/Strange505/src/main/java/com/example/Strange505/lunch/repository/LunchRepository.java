package com.example.Strange505.lunch.repository;

import com.example.Strange505.lunch.domain.Lunch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LunchRepository extends JpaRepository<Lunch, Long> {
    List<Lunch> findByDate(String date);

    Optional<Lunch> findByDateAndLocalAndCourseName(String date, String local, String courseName);
}
