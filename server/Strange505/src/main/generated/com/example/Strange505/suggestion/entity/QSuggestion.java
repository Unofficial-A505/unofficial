package com.example.Strange505.suggestion.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QSuggestion is a Querydsl query type for Suggestion
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QSuggestion extends EntityPathBase<Suggestion> {

    private static final long serialVersionUID = 1369568388L;

    public static final QSuggestion suggestion = new QSuggestion("suggestion");

    public final StringPath content = createString("content");

    public final DatePath<java.time.LocalDate> createdDate = createDate("createdDate", java.time.LocalDate.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath title = createString("title");

    public QSuggestion(String variable) {
        super(Suggestion.class, forVariable(variable));
    }

    public QSuggestion(Path<? extends Suggestion> path) {
        super(path.getType(), path.getMetadata());
    }

    public QSuggestion(PathMetadata metadata) {
        super(Suggestion.class, metadata);
    }

}

