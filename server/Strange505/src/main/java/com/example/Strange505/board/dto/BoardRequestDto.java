package com.example.Strange505.board.dto;

import com.example.Strange505.board.domain.Board;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BoardRequestDto {
    private String name;

    public Board dtoToEntity(BoardRequestDto dto) {
        return Board.builder()
                .name(dto.getName())
                .createTime(LocalDateTime.now())
                .build();
    }
}
