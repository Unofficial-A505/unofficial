package com.example.Strange505.board.service;

import com.example.Strange505.board.dto.BoardRequestDto;
import com.example.Strange505.board.dto.BoardResponseDto;

public interface BoardService {

    BoardResponseDto createBoard(BoardRequestDto dto);

    BoardResponseDto updateBoard(Long id, BoardRequestDto dto);

//    void deleteBoardWithArticles(Long id);
}
