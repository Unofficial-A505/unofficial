package com.example.Strange505.board.repository;


import com.example.Strange505.board.domain.Article;
import static com.example.Strange505.board.domain.QArticle.article;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import io.micrometer.common.util.StringUtils;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class ArticleRepositoryImpl implements ArticleRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<Article> searchByTitleAndContent(String title, String content, Long boardId) {
        return queryFactory
                .selectFrom(article)
                .where(eqBoard(boardId).and(titleLike(title).or(contentLike(content))))
                .fetch();
    }

    private BooleanExpression titleLike(String title) {
        if(StringUtils.isEmpty(title)){
            return null;
        }
        return article.title.contains(title);
    }

    private BooleanExpression contentLike(String content) {
        if (StringUtils.isEmpty(content)) {
            return null;
        }
        return article.content.contains(content);
    }

    private BooleanExpression eqBoard(Long boardId) {
        if (boardId == null) {
            return null;
        }
        return article.board.id.eq(boardId);
    }

    @Override
    public List<Article> searchByUser(Long userId) {
        return queryFactory.select(article)
                .from(article)
                .where(article.user.id.eq(userId))
                .fetch();
    }

    @Override
    public List<Article> searchByBoard(Long boardId) {
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
