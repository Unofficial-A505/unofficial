package com.example.Strange505.suggestion.controller;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.Strange505.suggestion.dto.SuggestionDTO;
import com.example.Strange505.suggestion.service.SuggestionService;
import java.util.List;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/suggestions")
@RequiredArgsConstructor
@Tag(name = "Suggestion", description = "건의하기 API")
public class SuggestionController {
    @Autowired
    private SuggestionService suggestionService;

    @Operation(summary = "건의 등록")
    @PostMapping
    public SuggestionDTO createSuggestion(@RequestBody SuggestionDTO suggestionDTO) {
        return suggestionService.createSuggestion(suggestionDTO);
    }

    @Operation(summary = "건의 수정")
    @PutMapping("/{id}")
    public SuggestionDTO updateSuggestion(@PathVariable Long id, @RequestBody SuggestionDTO suggestionDTO) {
        return suggestionService.updateSuggestion(id, suggestionDTO);
    }
    @Operation(summary = "건의 목록 가져오기")
    @GetMapping
    public List<SuggestionDTO> getSuggestions() {
        return suggestionService.getSuggestions();
    }
    @Operation(summary = "특정 건의 가져오기")
    @GetMapping("/{id}")
    public SuggestionDTO getSuggestionById(@PathVariable Long id) {
        return suggestionService.getSuggestionById(id);
    }
}
