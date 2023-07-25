package com.example.Strange505.user.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = -1200661359L;

    public static final QUser user = new QUser("user");

    public final StringPath email = createString("email");

    public final NumberPath<Integer> gen = createNumber("gen", Integer.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final BooleanPath is_activated = createBoolean("is_activated");

    public final BooleanPath is_withdraw = createBoolean("is_withdraw");

    public final StringPath local = createString("local");

    public final StringPath password = createString("password");

    public final NumberPath<Integer> point = createNumber("point", Integer.class);

    public final EnumPath<Role> role = createEnum("role", Role.class);

    public final StringPath verification = createString("verification");

    public QUser(String variable) {
        super(User.class, forVariable(variable));
    }

    public QUser(Path<? extends User> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUser(PathMetadata metadata) {
        super(User.class, metadata);
    }

}

