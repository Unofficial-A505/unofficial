package com.example.Strange505.board.dto;

import com.example.Strange505.board.domain.Board;
import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BoardResponseDto {
    private Long id;
    private String name;

    public BoardResponseDto(Board board) {
        this.name = board.getName();
    }
}
