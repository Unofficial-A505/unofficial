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
    private Integer sequence;

    public BoardResponseDto(Board board) {
        this.id = board.getId();
        this.name = board.getName();
        this.sequence = board.getSequence();
    }
}
