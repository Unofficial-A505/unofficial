//package com.example.Strange505.board.service;
//
//import com.example.Strange505.board.domain.Article;
//import com.example.Strange505.board.domain.Board;
//import com.example.Strange505.board.dto.ArticleRequestDto;
//import com.example.Strange505.board.dto.BoardRequestDto;
//import com.example.Strange505.board.dto.BoardResponseDto;
//import com.example.Strange505.board.repository.BoardRepository;
//import com.example.Strange505.user.domain.User;
//import com.example.Strange505.user.dto.AuthDto;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.annotation.Commit;
//
//import java.time.LocalDateTime;
//import java.util.List;
//import java.util.NoSuchElementException;
//
//@SpringBootTest
//class BoardServiceImplTest {
//    @Autowired
//    private BoardService boardService;
//    @Autowired
//    private BoardRepository boardRepository;
//
//    @BeforeEach
//    public void init() throws Exception {
//        BoardRequestDto dto = BoardRequestDto.builder().name("자유게시판").build();
//        BoardResponseDto savedBoard = boardService.createBoard(dto);
//    }
//
//    @Test
//    public void 게시판_생성() {
//        String name = "자유게시판";
//        org.assertj.core.api.Assertions.assertThat(name).isEqualTo(savedBoard.getName());
//    }
//
//    @Test
//    public void 게시판_수정() {
//        String modifiedName = "변경3";
//        BoardRequestDto dto = BoardRequestDto.builder().name(modifiedName).build();
//        BoardResponseDto updatedBoard = boardService.updateBoard(1L, dto);
//
//        org.assertj.core.api.Assertions.assertThat(modifiedName).isEqualTo(updatedBoard.getName());
//
//    }
//
//    @Test
//    public void 게시판_모두_조회() {
//        BoardRequestDto dto = BoardRequestDto.builder().name("1").build();
//        boardService.createBoard(dto);
//        BoardRequestDto dto2 = BoardRequestDto.builder().name("2").build();
//        boardService.createBoard(dto2);
//
//        List<BoardResponseDto> result = boardService.getAllBoards();
//        org.assertj.core.api.Assertions.assertThat(result.size()).isEqualTo(2);
//        for (BoardResponseDto boardResponseDto:
//             result) {
//            System.out.println(boardResponseDto.getName());
//        }
//
//    }
//
//}