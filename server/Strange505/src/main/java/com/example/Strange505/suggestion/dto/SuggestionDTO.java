package com.example.Strange505.suggestion.dto;
import lombok.*;
import java.time.LocalDate;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SuggestionDTO {
    private Long id;
    private String title;
    private String content;
    private LocalDate createdDate;
}