package com.example.Strange505.lunch;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QLunch is a Querydsl query type for Lunch
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QLunch extends EntityPathBase<Lunch> {

    private static final long serialVersionUID = -1101256569L;

    public static final QLunch lunch = new QLunch("lunch");

    public final StringPath courseName = createString("courseName");

    public final StringPath date = createString("date");

    public final StringPath detail = createString("detail");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath imageUrl = createString("imageUrl");

    public final NumberPath<Long> likes = createNumber("likes", Long.class);

    public final StringPath local = createString("local");

    public final StringPath name = createString("name");

    public final StringPath restaurantId = createString("restaurantId");

    public QLunch(String variable) {
        super(Lunch.class, forVariable(variable));
    }

    public QLunch(Path<? extends Lunch> path) {
        super(path.getType(), path.getMetadata());
    }

    public QLunch(PathMetadata metadata) {
        super(Lunch.class, metadata);
    }

}

