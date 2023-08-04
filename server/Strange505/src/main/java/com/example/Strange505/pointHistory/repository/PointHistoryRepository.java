package com.example.Strange505.pointHistory.repository;

import com.example.Strange505.pointHistory.entity.PointHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PointHistoryRepository extends JpaRepository<PointHistory, Long> {
    Page<PointHistory> findByUserIdOrderByActionDateDesc(Long userId, Pageable pageable);
}
