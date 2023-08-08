package com.example.Strange505.board.repository;

import com.example.Strange505.board.domain.BestArticle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BestArticleRepository extends JpaRepository<BestArticle, Long> {
    List<BestArticle> findTop15ByOrderByIdDesc();
}
