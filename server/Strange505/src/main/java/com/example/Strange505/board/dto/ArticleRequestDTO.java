package com.example.Strange505.board.dto;

import com.example.Strange505.board.domain.Board;
import com.example.Strange505.user.domain.User;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ArticleRequestDTO {
    private String title;
    private String content;
    private String boardName;
}
