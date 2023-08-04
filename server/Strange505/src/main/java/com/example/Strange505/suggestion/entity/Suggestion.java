package com.example.Strange505.suggestion.entity;
import lombok.*;
import jakarta.persistence.*;
import com.example.Strange505.suggestion.dto.SuggestionDTO;
import java.time.LocalDate;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "suggestion")
public class Suggestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String content;

    @Column(columnDefinition = "DATE")
    private LocalDate createdDate;

    public void update(SuggestionDTO suggestionDto) {
        this.title = suggestionDto.getTitle();
        this.content = suggestionDto.getContent();
        this.createdDate = suggestionDto.getCreatedDate();
    }
}