package com.example.Strange505.board.domain;

import com.example.Strange505.user.domain.User;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Article {

    @Id @GeneratedValue
    @Column(name = "article_id")
    private Long id;
    private String title;
    @Column(length = 5000)
    private String content;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "board_id")
    private Board board;
    private Long likes;
    private Long views;
    private LocalDateTime createTime;
    private LocalDateTime modifyTime;
}
