package com.example.Strange505.board.repository;

import com.example.Strange505.board.domain.Board;
import com.example.Strange505.board.domain.QBoard;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class BoardRepositoryImpl implements BoardRepositoryCutstom{

    private final JPAQueryFactory queryFactory;

    @Override
    public List<Board> searchBoardByName(String name) {
        QBoard board = QBoard.board;
        return queryFactory.select(board)
                .from(board)
                .where(board.name.eq(name))
                .fetch();
    }
}
