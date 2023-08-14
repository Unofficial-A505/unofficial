package com.example.Strange505.board.repository;


import com.example.Strange505.board.domain.Article;
import com.example.Strange505.board.domain.QArticle;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import io.micrometer.common.util.StringUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;

import static com.example.Strange505.board.domain.QArticle.*;

@RequiredArgsConstructor
public class ArticleRepositoryImpl implements ArticleRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public Page<Article> searchByTitleAndContent(String keyword, Long boardId, Pageable pageable) {
        List<Article> result = queryFactory
                .selectFrom(article)
                .where(titleCheck(keyword).or(contentCheck(keyword)))
                .where(eqBoard(boardId))
                .where(article.isRemoved.isFalse())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(article.id.desc())
                .fetch();

        Long count = queryFactory
                .select(article.count())
                .from(article)
                .where(titleCheck(keyword).or(contentCheck(keyword)))
                .where(eqBoard(boardId))
                .where(article.isRemoved.isFalse())
                .fetchOne();

        return new PageImpl<>(result, pageable, count);
    }

    private BooleanExpression titleCheck(String title) {

        if (StringUtils.isEmpty(title)) {
            return null;
        }
        return article.title.contains(title);
    }

    private BooleanExpression contentCheck(String content) {


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
    public Page<Article> searchByUser(Long userId, Pageable pageable) {

        List<Article> result = queryFactory
                .selectFrom(article)
                .where(article.user.id.eq(userId))
                .where(article.isRemoved.isFalse())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(article.id.desc())
                .fetch();

        Long count = queryFactory
                .select(article.count())
                .from(article)
                .where(article.user.id.eq(userId))
                .where(article.isRemoved.isFalse())
                .fetchOne();

        return new PageImpl<>(result, pageable, count);
    }

    @Override
    public Page<Article> searchByBoard(Long boardId, Pageable pageable) {

        List<Article> result = queryFactory
                .selectFrom(article)
                .from(article)
                .where(article.board.id.eq(boardId))
                .where(article.isRemoved.isFalse())
                .orderBy(article.id.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long count = queryFactory
                .select(article.count())
                .from(article)
                .where(article.board.id.eq(boardId))
                .where(article.isRemoved.isFalse())
                .fetchOne();

        return new PageImpl<>(result, pageable, count);
    }

    @Override
    public Page<Article> searchAllArticles(Pageable pageable) {
        List<Article> result = queryFactory
                .selectFrom(article)
                .where(article.isRemoved.isFalse())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(article.id.desc())
                .fetch();

        Long count = queryFactory
                .select(article.count())
                .from(article)
                .where(article.isRemoved.isFalse())
                .fetchOne();

        return new PageImpl<>(result, pageable, count);
    }

    @Override
    public void addLikeCount(Article targetArticle) {
        targetArticle.addLike();
    }

    @Override
    public void subLikeCount(Article targetArticle) {
        targetArticle.subLike();
    }
}
