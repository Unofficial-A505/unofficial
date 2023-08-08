package com.example.Strange505.board.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
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
    private Long boardId;
    private String nickName;
    private Integer likes;
    private Integer views;
    private Integer gen;
    private String local;
    private Boolean isLiked;
    private Boolean isUser;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createTime;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime modifyTime;
}
