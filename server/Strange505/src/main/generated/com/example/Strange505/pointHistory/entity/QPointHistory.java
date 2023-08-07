package com.example.Strange505.pointHistory.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QPointHistory is a Querydsl query type for PointHistory
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPointHistory extends EntityPathBase<PointHistory> {

    private static final long serialVersionUID = 1537166980L;

    public static final QPointHistory pointHistory = new QPointHistory("pointHistory");

    public final DateTimePath<java.sql.Timestamp> actionDate = createDateTime("actionDate", java.sql.Timestamp.class);

    public final StringPath description = createString("description");

    public final NumberPath<Integer> diff = createNumber("diff", Integer.class);

    public final NumberPath<Long> pointId = createNumber("pointId", Long.class);

    public final NumberPath<Integer> remainingPoints = createNumber("remainingPoints", Integer.class);

    public final NumberPath<Long> userId = createNumber("userId", Long.class);

    public QPointHistory(String variable) {
        super(PointHistory.class, forVariable(variable));
    }

    public QPointHistory(Path<? extends PointHistory> path) {
        super(path.getType(), path.getMetadata());
    }

    public QPointHistory(PathMetadata metadata) {
        super(PointHistory.class, metadata);
    }

}

