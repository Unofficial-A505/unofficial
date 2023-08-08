package com.example.Strange505.board.dto;

import com.example.Strange505.board.domain.Board;
import com.example.Strange505.user.domain.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ArticleRequestDto {
    @Schema(description = "게시글 아이디", example = "206")
    private Long id;
    @Schema(description = "게시글 제목", example = "제목입니다")
    private String title;
    @Schema(description = "게시글 내용", example = "내용입니다")
    private String content;
    @Schema(description = "게시글이 속한 게시판 이름", example = "자유게시판")
    private String boardName;
    @Schema(description = "게시글 작성자 닉네임", example = "하이")
    private String nickName;
}
