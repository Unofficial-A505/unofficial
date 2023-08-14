package com.example.Strange505.board.domain;

import com.example.Strange505.board.dto.ArticleRequestDto;
import com.example.Strange505.user.domain.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Table(name = "Articles")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "article_id")
    private Long id;
    @Column(length = 100, nullable = false)
    private String title;

    @Column(length = 10000, nullable = false)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(length = 20, nullable = false)
    private String nickName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;

    @OneToOne(mappedBy = "article")
    private BestArticle bestArticle;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "article")
    private List<Comment> comments;

    private Integer likes;
    private Integer views;
    private LocalDateTime createTime;
    private LocalDateTime modifyTime;

    // 삭제 상태 변수
    @Column(columnDefinition = "boolean default false")
    private Boolean isRemoved = false;

    public static Article createArticle(ArticleRequestDto dto, User user, Board board) {
        Article article = new Article();
        article.title = dto.getTitle();
        article.content = dto.getContent();
        article.board = board;
        article.createTime = LocalDateTime.now();
        article.modifyTime = LocalDateTime.now();
        article.user = user;
        article.nickName = dto.getNickName();
        article.likes = 0;
        article.views = 0;

        return article;
    }

    public void updateArticle(ArticleRequestDto dto, Board board) {
        this.title = dto.getTitle();
        this.content = dto.getContent();
        this.nickName = dto.getNickName();
        this.board = board;
    }

    public void remove() {
        this.isRemoved = true;
    }

    public void addView() {
        this.views++;
    }

    public void addLike() {
        this.likes++;
    }

    public void subLike() {
        if(this.likes > 0) {
            this.likes--;
        }
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
}
