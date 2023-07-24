package com.example.Strange505.board.repository;

import com.example.Strange505.board.domain.Board;

import java.util.List;

public interface BoardRepositoryCutstom {

    List<Board> searchBoardByName(String name);
}
