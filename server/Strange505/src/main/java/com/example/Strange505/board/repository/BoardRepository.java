package com.example.Strange505.board.repository;

import com.example.Strange505.board.domain.Board;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long>, BoardRepositoryCutstom {
    Optional<Board> findByName(String name);
}
