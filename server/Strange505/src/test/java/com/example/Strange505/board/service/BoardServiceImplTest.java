package com.example.Strange505.board.service;

import com.example.Strange505.board.domain.Article;
import com.example.Strange505.board.domain.Board;
import com.example.Strange505.board.dto.BoardDTO;
import com.example.Strange505.board.repository.BoardRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class BoardServiceImplTest {
    @Autowired
    private BoardService boardService;

    @Test
    public void 게시판_생성() {
        String name = "게시판";
        BoardDTO boardDTO = BoardDTO.builder().name(name).createTime(LocalDateTime.now()).modifyTime(LocalDateTime.now()).build();
        Board savedBoard = boardService.createBoard(boardDTO);

        org.assertj.core.api.Assertions.assertThat(name).isEqualTo(savedBoard.getName());
    }

    @Test
    public void 게시판_수정() {
        String name = "게시판";
        String modifiedName = "변경";
        BoardDTO boardDTO = BoardDTO.builder().name(name).createTime(LocalDateTime.now()).modifyTime(LocalDateTime.now()).build();
        Board savedBoard = boardService.createBoard(boardDTO);
        BoardDTO modifiedBoardDTO = BoardDTO.builder().name(modifiedName).createTime(LocalDateTime.now()).modifyTime(LocalDateTime.now()).build();
        boardService.updateBoard(savedBoard.getId(), modifiedBoardDTO);

        org.assertj.core.api.Assertions.assertThat(modifiedName).isEqualTo(modifiedBoardDTO.getName());

    }

}