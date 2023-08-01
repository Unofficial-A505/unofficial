package com.example.Strange505.board.dto;

import com.example.Strange505.board.domain.Board;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BoardRequestDto {
    private Long id;
    private String name;

    public Board dtoToEntity(BoardRequestDto dto) {
        return Board.builder()
                .name(dto.getName())
                .createTime(LocalDateTime.now())
                .build();
    }
}
