package com.example.Strange505.board.service;

import com.example.Strange505.board.domain.Board;
import com.example.Strange505.board.dto.BoardDTO;
import com.example.Strange505.board.repository.BoardRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;

    void createBoard(BoardDTO boardDTO) {
        Board board = new Board();

    }
    void updateBoard(Long id, BoardDTO boardDTO) {

    }
    void deleteBoard(Long id) {

    }
}
