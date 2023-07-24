package com.example.Strange505.board.service;

import com.example.Strange505.board.dto.BoardRequestDto;
import com.example.Strange505.board.dto.BoardResponseDto;

import java.util.List;

public interface BoardService {

    BoardResponseDto createBoard(BoardRequestDto dto);

    BoardResponseDto updateBoard(Long id, BoardRequestDto dto);

    List<BoardResponseDto> getAllBoards();

//    void deleteBoardWithArticles(Long id);
}
