//package com.example.Strange505.board.service;
//
//import com.example.Strange505.board.dto.CommentRequestDto;
//import com.example.Strange505.board.dto.CommentResponseDto;
//import com.example.Strange505.user.service.AuthService;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.annotation.Commit;
//
//import java.util.List;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@SpringBootTest
//class CommentServiceImplTest {
//    @Value("${tempToken.accessToken}")
//    private String accessToken;
//
//    @Autowired
//    private CommentService commentService;
//
//    @Autowired
//    private AuthService authService;
//
//    @Test
//    public void 댓글_생성() {
//        Long userId = 3L;
//        CommentRequestDto dto = CommentRequestDto.builder()
//                .content("댓글")
//                .articleId(1L)
//                .parentId(102L)
//                .build();
//        CommentResponseDto savedComment = commentService.createComment(userId, dto);
//        org.assertj.core.api.Assertions.assertThat("댓글").isEqualTo(savedComment.getContent());
//    }
//
//    @Test
//    public void 댓글_수정() {
//        CommentRequestDto dto = CommentRequestDto.builder()
//                .content("수정_댓글")
//                .articleId(1L)
//                .parentId(0L)
//                .build();
//        CommentResponseDto responseDto = commentService.updateComment(102L, dto);
//        org.assertj.core.api.Assertions.assertThat("수정_댓글").isEqualTo(responseDto.getContent());
//    }
//
//    @Test
//    public void 댓글_삭제() {
//        commentService.deleteComment(152L);
//    }
//
//    @Test
//    public void 아이디로_조회() {
//        CommentResponseDto dto = commentService.getCommentById(102L);
//        org.assertj.core.api.Assertions.assertThat("수정_댓글").isEqualTo(dto.getContent());
//    }
//
//    @Test
//    public void 게시글로_조회() {
//        List<CommentResponseDto> list = commentService.getCommentByArticle(1L);
//        for (CommentResponseDto dto : list
//        ) {
//            System.out.println(dto.getUserId() + dto.getContent());
//        }
//    }
//
//    @Test
//    public void 사용자로_조회() {
//        List<CommentResponseDto> list = commentService.getCommentByUser(1L);
//        for (CommentResponseDto dto : list
//        ) {
//            System.out.println(dto.getUserId() + dto.getContent());
//        }
//    }
//}