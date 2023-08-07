package com.example.Strange505.board.dto;

import com.example.Strange505.board.domain.Comment;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentRequestDto {

    private Long id;
    private Long articleId;
    private String content;
    private Long parentId;
    private String nickName;
}
