package com.example.Strange505.board.dto;

import com.example.Strange505.board.domain.Board;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BoardResponseDto {
    private String name;

    public BoardResponseDto(Board board) {
        this.name = board.getName();
    }
}
