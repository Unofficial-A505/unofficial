package com.example.Strange505.board.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ArticleResponseDto {
    private Long id;
    private String title;
    private String content;
    private String boardName;
    private String nickName;
    private Integer likes;
    private Integer views;
    private LocalDateTime createTime;
    private LocalDateTime modifyTime;
}
