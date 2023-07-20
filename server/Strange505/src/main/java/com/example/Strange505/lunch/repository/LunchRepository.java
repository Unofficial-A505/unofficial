package com.example.Strange505.lunch.repository;

import com.example.Strange505.lunch.Lunch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LunchRepository extends JpaRepository<Lunch, Long> {
    List<Lunch> findByDate(String date);

    Lunch findByDateAndLocalAndCourseName(String date, String local, String courseName);
}
