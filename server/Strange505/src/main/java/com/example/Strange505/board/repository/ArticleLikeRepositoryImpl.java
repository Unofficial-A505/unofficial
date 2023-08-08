package com.example.Strange505.board.repository;

import com.example.Strange505.board.domain.Article;
import com.example.Strange505.board.domain.ArticleLike;
import com.example.Strange505.user.domain.User;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

import static com.example.Strange505.board.domain.QArticleLike.articleLike;

@RequiredArgsConstructor
public class ArticleLikeRepositoryImpl implements ArticleLikeRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public Boolean findByArticleAndUser(Long articleId, Long userId) {
        List<ArticleLike> result = queryFactory
                .selectFrom(articleLike)
                .where(articleLike.article.id.eq(articleId))
                .where(articleLike.user.id.eq(userId))
                .fetch();
        if(result.size() == 0) {
            return false;
        } else if (result.size() == 1){
            return true;
        } else {
            throw new RuntimeException("잘못 저장된 정보입니다.");
        }
    }
}
