package com.example.Strange505.board.domain;

import com.example.Strange505.user.domain.User;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Table(name = "Comments")
@Builder
public class Comment {
    @Id
    @GeneratedValue
    @Column(name = "comment_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "article_id")
    private Article article;

    @Column(length = 1000, nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private Comment parent;

    @OneToMany(mappedBy = "parent")
    private List<Comment> children;

    private LocalDateTime createTime;
    private LocalDateTime modifyTime;

    public void update(String content, LocalDateTime modifyTime) {
        this.content = content;
        this.modifyTime = modifyTime;
    }
}
