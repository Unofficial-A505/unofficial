package com.example.Strange505.board.dto;

import com.example.Strange505.board.domain.Comment;
import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentResponseDto {

    private Long id;
    private Long userId;
    private Long articleId;
    private String content;
    private Comment parent;

    public CommentResponseDto(Comment comment) {
        this.content = comment.getContent();
        this.articleId = comment.getArticle().getId();
        this.userId = comment.getUser().getId();
        this.parent = comment.getParent();
    }
}
