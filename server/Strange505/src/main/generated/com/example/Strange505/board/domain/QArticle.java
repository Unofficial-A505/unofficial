package com.example.Strange505.board.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QArticle is a Querydsl query type for Article
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QArticle extends EntityPathBase<Article> {

    private static final long serialVersionUID = 1064645011L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QArticle article = new QArticle("article");

    public final QBestArticle bestArticle;

    public final QBoard board;

    public final ListPath<Comment, QComment> comments = this.<Comment, QComment>createList("comments", Comment.class, QComment.class, PathInits.DIRECT2);

    public final StringPath content = createString("content");

    public final DateTimePath<java.time.LocalDateTime> createTime = createDateTime("createTime", java.time.LocalDateTime.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final BooleanPath isRemoved = createBoolean("isRemoved");

    public final NumberPath<Integer> likes = createNumber("likes", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> modifyTime = createDateTime("modifyTime", java.time.LocalDateTime.class);

    public final StringPath nickName = createString("nickName");

    public final StringPath title = createString("title");

    public final com.example.Strange505.user.domain.QUser user;

    public final NumberPath<Integer> views = createNumber("views", Integer.class);

    public QArticle(String variable) {
        this(Article.class, forVariable(variable), INITS);
    }

    public QArticle(Path<? extends Article> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QArticle(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QArticle(PathMetadata metadata, PathInits inits) {
        this(Article.class, metadata, inits);
    }

    public QArticle(Class<? extends Article> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.bestArticle = inits.isInitialized("bestArticle") ? new QBestArticle(forProperty("bestArticle"), inits.get("bestArticle")) : null;
        this.board = inits.isInitialized("board") ? new QBoard(forProperty("board")) : null;
        this.user = inits.isInitialized("user") ? new com.example.Strange505.user.domain.QUser(forProperty("user")) : null;
    }

}

