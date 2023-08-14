package com.example.Strange505.board.repository;

import com.example.Strange505.board.domain.Comment;
import com.example.Strange505.board.domain.QArticle;
import com.example.Strange505.board.domain.QComment;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;

import static com.example.Strange505.board.domain.QArticle.article;

@RequiredArgsConstructor
public class CommentRepositoryImpl implements CommentRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public Page<Comment> searchByArticle(Long articleId, Pageable pageable) {
        QComment comment = QComment.comment;
        List<Comment> result = queryFactory.select(comment)
                .from(comment)
                .where(comment.article.id.eq(articleId))
                .where(comment.isRemoved.isFalse())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long count = queryFactory
                .select(comment.count())
                .from(comment)
                .where(comment.article.id.eq(articleId))
                .where(comment.isRemoved.isFalse())
                .fetchOne();

        return new PageImpl<>(result, pageable, count);
    }

    @Override
    public Integer getCountByArticle(Long articleId) {
        QComment comment = QComment.comment;
        return Math.toIntExact(queryFactory.select(comment.count())
                .from(comment)
                .where(comment.article.id.eq(articleId))
                .where(comment.isRemoved.isFalse())
                .fetchFirst());
    }

    @Override
    public Page<Comment> searchByUser(Long userId, Pageable pageable) {
        QComment comment = QComment.comment;
        List<Comment> result = queryFactory.select(comment)
                .from(comment)
                .where(comment.user.id.eq(userId))
                .where(comment.isRemoved.isFalse())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(comment.id.desc())
                .fetch();

        Long count = queryFactory
                .select(comment.count())
                .from(comment)
                .where(comment.user.id.eq(userId))
                .where(comment.isRemoved.isFalse())
                .fetchOne();

        return new PageImpl<>(result, pageable, count);
    }
}
