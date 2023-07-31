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
    public List<Article> searchByTitleAndContent(String keyword, Long boardId) {
        return queryFactory
                .selectFrom(article)
                .where(eqBoard(boardId).and(titleCheck(keyword).or(contentCheck(keyword))))
                .fetch();
    }

    private BooleanExpression titleCheck(String title) {
        if(StringUtils.isEmpty(title)){
            return null;
        }

    private BooleanExpression contentCheck(String content) {
        if (StringUtils.isEmpty(content)) {
            return null;
        }
        return article.content.contains(content);
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

    @Override
    public List<Article> searchByBoard(Long boardId) {
        QArticle article = QArticle.article;
        return queryFactory.select(article)
                .from(article)
                .where(article.board.id.eq(boardId))
                .fetch();
    }

    @Override
    public void addLikeCount(Article article) {
        article.addLike();
    }

    @Override
    public void subLikeCount(Article article) {
        article.subLike();
    }
}
