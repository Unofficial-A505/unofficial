package com.example.Strange505.board.repository;

import com.example.Strange505.board.domain.Comment;
import com.example.Strange505.board.domain.QArticle;
import com.example.Strange505.board.domain.QComment;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class CommentRepositoryImpl implements CommentRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<Comment> searchByArticle(Long articleId) {
        QComment comment = QComment.comment;
        return queryFactory.select(comment)
                .from(comment)
                .where(comment.article.id.eq(articleId))
                .fetch();
    }

    @Override
    public List<Comment> searchByUser(Long userId) {
        QComment comment = QComment.comment;
        return queryFactory.select(comment)
                .from(comment)
                .where(comment.user.id.eq(userId))
                .fetch();
    }
}
