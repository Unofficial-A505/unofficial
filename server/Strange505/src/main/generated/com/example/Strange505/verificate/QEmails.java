package com.example.Strange505.verificate;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QEmails is a Querydsl query type for Emails
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QEmails extends EntityPathBase<Emails> {

    private static final long serialVersionUID = 621182062L;

    public static final QEmails emails = new QEmails("emails");

    public final StringPath email = createString("email");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public QEmails(String variable) {
        super(Emails.class, forVariable(variable));
    }

    public QEmails(Path<? extends Emails> path) {
        super(path.getType(), path.getMetadata());
    }

    public QEmails(PathMetadata metadata) {
        super(Emails.class, metadata);
    }

}

