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
    private Integer likes;
    private Integer views;
    private Integer gen;
    private String local;
    private Long boardId;
    private String boardName;
}
