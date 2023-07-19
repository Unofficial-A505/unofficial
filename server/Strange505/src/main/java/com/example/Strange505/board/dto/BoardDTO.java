package com.example.Strange505.board.dto;

import com.example.Strange505.board.domain.Article;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BoardDTO {
    private Long id;
    private String name;
    private LocalDateTime createTime;
    private LocalDateTime modifyTime;
    private List<Article> articles = new ArrayList<>();
}
