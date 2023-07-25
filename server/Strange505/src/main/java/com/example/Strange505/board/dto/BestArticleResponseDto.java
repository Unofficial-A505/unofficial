package com.example.Strange505.board.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BestArticleResponseDto {

    private String title;
    private Long likes;
    private String gen;
    private String local;
}
