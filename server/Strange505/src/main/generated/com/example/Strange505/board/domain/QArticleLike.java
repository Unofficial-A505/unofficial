package com.example.Strange505.board.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QArticleLike is a Querydsl query type for ArticleLike
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QArticleLike extends EntityPathBase<ArticleLike> {

    private static final long serialVersionUID = 934302666L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QArticleLike articleLike = new QArticleLike("articleLike");

    public final QArticle article;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.example.Strange505.user.domain.QUser user;

    public QArticleLike(String variable) {
        this(ArticleLike.class, forVariable(variable), INITS);
    }

    public QArticleLike(Path<? extends ArticleLike> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QArticleLike(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QArticleLike(PathMetadata metadata, PathInits inits) {
        this(ArticleLike.class, metadata, inits);
    }

    public QArticleLike(Class<? extends ArticleLike> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.article = inits.isInitialized("article") ? new QArticle(forProperty("article"), inits.get("article")) : null;
        this.user = inits.isInitialized("user") ? new com.example.Strange505.user.domain.QUser(forProperty("user")) : null;
    }

}

