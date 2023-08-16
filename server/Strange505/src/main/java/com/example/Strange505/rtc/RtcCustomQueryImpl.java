package com.example.Strange505.rtc;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class RtcCustomQueryImpl implements RtcCustomQuery {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<RtcRoom> findByManCountLow2(String sessionId) {
        QRtcRoom room = QRtcRoom.rtcRoom;
        List<RtcRoom> result = queryFactory.select(room)
                .from(room)
                .where(room.manCount.lt(2))
                .where(room.name.eq(sessionId))
                .fetch();
        return result;
    }
}
