package com.example.Strange505.board.service;

import com.example.Strange505.board.domain.Board;
import com.example.Strange505.board.dto.BoardRequestDto;
import com.example.Strange505.board.dto.BoardResponseDto;
import com.example.Strange505.board.repository.BoardRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;

import java.util.List;

@SpringBootTest
@Commit
class BoardServiceImplTest {
    @Autowired
    private BoardService boardService;
    @Autowired
    private BoardRepository boardRepository;

    @Test
    public void 게시판_생성() {
        String name = "게시판";
        BoardRequestDto dto = BoardRequestDto.builder().name(name).build();
        BoardResponseDto savedBoard = boardService.createBoard(dto);

        org.assertj.core.api.Assertions.assertThat(name).isEqualTo(savedBoard.getName());
    }

    @Test
    public void 게시판_수정() {
        String modifiedName = "변경";
        BoardRequestDto dto = BoardRequestDto.builder().name(modifiedName).build();
        boardService.createBoard(dto);
        Board board = boardRepository.findById(1L).orElseThrow(() -> new RuntimeException("Board not found"));
        BoardResponseDto updatedBoard = boardService.updateBoard(board.getId(), dto);

        org.assertj.core.api.Assertions.assertThat(modifiedName).isEqualTo(updatedBoard.getName());

    }

    @Test
    public void 게시판_모두_조회() {
        BoardRequestDto dto = BoardRequestDto.builder().name("1").build();
        boardService.createBoard(dto);
        BoardRequestDto dto2 = BoardRequestDto.builder().name("2").build();
        boardService.createBoard(dto2);

        List<BoardResponseDto> result = boardService.getAllBoards();
        org.assertj.core.api.Assertions.assertThat(result.size()).isEqualTo(2);
        for (BoardResponseDto boardResponseDto:
             result) {
            System.out.println(boardResponseDto.getName());
        }

    }

}