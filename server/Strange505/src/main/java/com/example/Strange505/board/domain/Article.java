package com.example.Strange505.board.domain;

import com.example.Strange505.board.dto.ArticleRequestDTO;
import com.example.Strange505.user.domain.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Getter
@Table(name = "Articles")
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
    private Integer likes;
    private Integer views;
    private LocalDateTime createTime;
    private LocalDateTime modifyTime;


    public static Article createArticle(ArticleRequestDTO dto, User user, Board board) {
        Article article = new Article();
        article.title = dto.getTitle();
        article.content = dto.getContent();
        article.board = board;
        article.createTime = LocalDateTime.now();
        article.modifyTime = LocalDateTime.now();
        article.user = user;
        article.likes = 0;
        article.views = 0;

        return article;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Article article = (Article) o;
        return Objects.equals(id, article.id) && Objects.equals(title, article.title) && Objects.equals(content, article.content) && Objects.equals(user, article.user) && Objects.equals(board, article.board) && Objects.equals(likes, article.likes) && Objects.equals(views, article.views) && Objects.equals(createTime, article.createTime) && Objects.equals(modifyTime, article.modifyTime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, content, user, board, likes, views, createTime, modifyTime);
    }

    // 게시판에 게시글 추가
//    public void addToBoard(Board board) {
//        this.board = board;
//        this.board.getArticles().add(this);
//    }
}
