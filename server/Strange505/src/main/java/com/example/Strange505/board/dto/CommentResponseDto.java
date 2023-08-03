package com.example.Strange505.board.dto;

import com.example.Strange505.board.domain.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentResponseDto implements Serializable {

    private Long id;
    private Long userId;
    private Long articleId;
    private String content;
    private Long parentId;
    private LocalDateTime createTime;
    private LocalDateTime modifyTime;

    public CommentResponseDto(Comment comment) {
        this.content = comment.getContent();
        this.articleId = comment.getArticle().getId();
        this.userId = comment.getUser().getId();
        this.parentId = comment.getParent().getId();
        this.createTime = comment.getCreateTime();
        this.modifyTime = comment.getModifyTime();
    }
}
