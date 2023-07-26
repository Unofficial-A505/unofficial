package com.example.Strange505.board.repository;


import com.example.Strange505.board.domain.Article;
import com.example.Strange505.board.domain.QArticle;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class ArticleRepositoryImpl implements ArticleRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<Article> searchByTitle(String title) {
        QArticle article = QArticle.article;
        return queryFactory.select(article)
                .from(article)
                .where(article.title.contains(title))
                .fetch();
    }

    @Override
    public List<Article> searchByContent(String content) {
        QArticle article = QArticle.article;
        return queryFactory.select(article)
                .from(article)
                .where(article.content.contains(content))
                .fetch();
    }

    @Override
    public List<Article> searchByUser(Long userId) {
        QArticle article = QArticle.article;
        return queryFactory.select(article)
                .from(article)
                .where(article.user.id.eq(userId))
                .fetch();
    }
}
