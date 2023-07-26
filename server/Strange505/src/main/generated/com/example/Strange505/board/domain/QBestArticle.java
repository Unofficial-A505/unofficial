package com.example.Strange505.board.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBestArticle is a Querydsl query type for BestArticle
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBestArticle extends EntityPathBase<BestArticle> {

    private static final long serialVersionUID = 1271690383L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QBestArticle bestArticle = new QBestArticle("bestArticle");

    public final QArticle article;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public QBestArticle(String variable) {
        this(BestArticle.class, forVariable(variable), INITS);
    }

    public QBestArticle(Path<? extends BestArticle> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QBestArticle(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QBestArticle(PathMetadata metadata, PathInits inits) {
        this(BestArticle.class, metadata, inits);
    }

    public QBestArticle(Class<? extends BestArticle> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.article = inits.isInitialized("article") ? new QArticle(forProperty("article"), inits.get("article")) : null;
    }

}

