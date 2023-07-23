package com.example.Strange505.board.service;

import com.example.Strange505.board.domain.Board;
import com.example.Strange505.board.dto.BoardRequestDto;
import com.example.Strange505.board.dto.BoardResponseDto;
import com.example.Strange505.board.repository.BoardRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;
//    private final ArticleRepository articleRepository;

    @Override
    public BoardResponseDto createBoard(BoardRequestDto dto) {
        Board board = dto.dtoToEntity(dto);
        Board save = boardRepository.save(board);
        return new BoardResponseDto(save);
    }

    @Override
    public BoardResponseDto updateBoard(Long id, BoardRequestDto dto) {
        Board board = boardRepository.findById(id).orElseThrow(() -> new RuntimeException("Board not found"));
        board.update(dto.getName(), LocalDateTime.now());
        Board save = boardRepository.save(board);
        return new BoardResponseDto(save);
    }

//    @Override
//    public void deleteBoardWithArticles(Long id) {
//        articleRepository.deleteByBoard();
//        boardRepository.deleteById(id);
//    }
}
