package com.example.Strange505.board.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ArticleResponseDTO {
    private String title;
    private String content;
    private String boardName;
    private String nickName;
    private LocalDateTime createTime;
    private LocalDateTime modifyTime;
}
