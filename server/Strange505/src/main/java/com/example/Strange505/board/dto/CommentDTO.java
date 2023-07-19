package com.example.Strange505.board.dto;

import com.example.Strange505.board.domain.Article;
import com.example.Strange505.board.domain.Comment;
import com.example.Strange505.user.domain.User;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentDTO {
    private Long id;
    private User user;
    private Article article;
    private String Content;
    private Comment parent;
    private List<Comment> children;
    private LocalDateTime createTime;
    private LocalDateTime modifyTime;
}
