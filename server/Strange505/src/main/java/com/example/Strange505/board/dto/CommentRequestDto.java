package com.example.Strange505.board.dto;

import com.example.Strange505.board.domain.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentRequestDto {

    private Long userId;
    private Long articleId;
    private String content;
    private Long parentId;
}
