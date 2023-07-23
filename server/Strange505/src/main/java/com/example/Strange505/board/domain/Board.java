package com.example.Strange505.board.domain;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name = "Boards")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Board {
    @Id @GeneratedValue
    @Column(name = "board_id")
    private Long id;
    @Column(nullable = false)
    private String name;
    private LocalDateTime createTime;
    private LocalDateTime modifyTime;
    @OneToMany(mappedBy = "board")
    private List<Article> articles = new ArrayList<>();

    public void update(String name, LocalDateTime modifyTime) {
        this.name = name;
        this.modifyTime = modifyTime;
    }
}
