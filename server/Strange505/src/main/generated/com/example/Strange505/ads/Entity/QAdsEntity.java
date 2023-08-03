package com.example.Strange505.ads.Entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QAdsEntity is a Querydsl query type for AdsEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAdsEntity extends EntityPathBase<AdsEntity> {

    private static final long serialVersionUID = 1398042053L;

    public static final QAdsEntity adsEntity = new QAdsEntity("adsEntity");

    public final EnumPath<AdStatus> adminConfirmed = createEnum("adminConfirmed", AdStatus.class);

    public final NumberPath<Integer> adsCost = createNumber("adsCost", Integer.class);

    public final NumberPath<Long> adsId = createNumber("adsId", Long.class);

    public final DatePath<java.time.LocalDate> endDate = createDate("endDate", java.time.LocalDate.class);

    public final StringPath imagePath = createString("imagePath");

    public final StringPath redirectUrl = createString("redirectUrl");

    public final NumberPath<Long> userId = createNumber("userId", Long.class);

    public QAdsEntity(String variable) {
        super(AdsEntity.class, forVariable(variable));
    }

    public QAdsEntity(Path<? extends AdsEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QAdsEntity(PathMetadata metadata) {
        super(AdsEntity.class, metadata);
    }

}

