package com.example.Strange505.board.domain;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Article {

    @Id @GeneratedValue
    private Long id;
    private String title;
    private String content;
    private Long userId;
    @ManyToOne
    @JoinColumn(name = "board_id")
    private Board board;
    private Long likes;
    private Long views;
    private LocalDateTime createTime;
    private LocalDateTime modifyTime;
}
