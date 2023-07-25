package com.example.Strange505.board.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "Best_articles")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BestArticle {

    @Id
    @GeneratedValue
    private Long id;

    @OneToOne
    @JoinColumn(name = "article_id")
    private Article article;

}
