package com.example.Strange505.file.repository;

import com.example.Strange505.file.entity.Image;
import com.example.Strange505.file.entity.QImage;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class ImageRepositoryImpl implements ImageRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<Image> searchByArticle(Long articleId) {

        QImage image = QImage.image;
        return queryFactory.select(image)
                .from(image)
                .where(image.article.id.eq(articleId))
                .fetch();
    }
}
