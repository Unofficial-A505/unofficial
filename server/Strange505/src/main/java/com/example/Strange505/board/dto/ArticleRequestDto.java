package com.example.Strange505.board.dto;

import com.example.Strange505.board.domain.Board;
import com.example.Strange505.user.domain.User;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ArticleRequestDto {
    private String title;
    private String content;
    private String boardName;
    private String nickName;
    private List<String> ImageList;
}
