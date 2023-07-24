package com.example.Strange505.board.repository;


import com.example.Strange505.board.domain.Article;
import com.example.Strange505.board.domain.QArticle;
import com.example.Strange505.user.domain.User;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class ArticleRepositoryImpl implements ArticleRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<Article> searchByTitle(String title, Long boardId) {
        QArticle article = QArticle.article;
        if (boardId == 0) {
            return queryFactory.select(article)
                    .from(article)
                    .where(article.title.contains(title))
                    .fetch();
        } else {
            return queryFactory.select(article)
                    .from(article)
                    .where(article.title.contains(title), article.board.id.eq(boardId))
                    .fetch();
        }

    }

    @Override
    public List<Article> searchByContent(String content, Long boardId) {
        QArticle article = QArticle.article;
        if (boardId == 0) {
            return queryFactory.select(article)
                    .from(article)
                    .where(article.content.contains(content))
                    .fetch();
        } else {
            return queryFactory.select(article)
                    .from(article)
                    .where(article.content.contains(content), article.board.id.eq(boardId))
                    .fetch();
        }
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
