package com.example.Strange505.lunch.repository;

import com.example.Strange505.lunch.domain.LunchLikes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LunchLikeRepository extends JpaRepository<LunchLikes, Long> {
    Long countByLunchId(Long lunchId);

    Optional<LunchLikes> findByLunchIdAndUserId(Long lunchId, Long userId);

    boolean existsByLunchIdAndUserId(Long lunchId, Long userId);
}
