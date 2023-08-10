package com.example.Strange505.board.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

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
    private Long articleId;
    private Integer commentsCount;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createTime;
}
