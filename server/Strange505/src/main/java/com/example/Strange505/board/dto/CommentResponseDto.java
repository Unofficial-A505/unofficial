package com.example.Strange505.board.dto;

import com.example.Strange505.board.domain.Comment;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class CommentResponseDto implements Serializable {

    private Long id;
    private Long articleId;
    private String content;
    private Long parentId;
    private String nickName;
    private Integer gen;
    private String local;
    private Boolean isUser;
    private LocalDateTime createTime;
    private LocalDateTime modifyTime;
    private List<CommentResponseDto> children;

    public CommentResponseDto(Comment comment) {
        this.content = comment.getContent();
        this.articleId = comment.getArticle().getId();
        this.parentId = comment.getParent().getId();
        this.nickName = comment.getNickName();
        this.createTime = comment.getCreateTime();
        this.modifyTime = comment.getModifyTime();
    }
}
