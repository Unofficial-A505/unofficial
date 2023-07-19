package com.example.Strange505.board.domain;

import com.example.Strange505.user.domain.User;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Article {

    @Id @GeneratedValue
    private Long id;
    private String title;
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
