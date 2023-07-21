package com.example.Strange505.board.service;

import com.example.Strange505.board.domain.Board;
import com.example.Strange505.board.dto.BoardDTO;

public interface BoardService {

    Board createBoard(BoardDTO boardDTO);

    void updateBoard(Long id, BoardDTO boardDTO);

    void deleteBoardWithArticles(Long id);

//    default Board dtoToEntity(BoardDTO boardDTO) {
//        Board entity = Board.builder()
//                .name(boardDTO.getName())
//                .build();
//        return entity;
//    }
}
