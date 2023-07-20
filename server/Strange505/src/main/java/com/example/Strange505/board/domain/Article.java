package com.example.Strange505.board.domain;

import com.example.Strange505.user.domain.User;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "Articles")
@Builder
public class Article {

    @Id
    @GeneratedValue
    @Column(name = "article_id")
    private Long id;
    private String title;

    @Column(length = 5000)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;
    private Long likes;
    private Long views;
    private LocalDateTime createTime;
    private LocalDateTime modifyTime;

    // 게시판에 게시글 추가
    public void addToBoard(Board board) {
        this.board = board;
        this.board.getArticles().add(this);
    }
}
