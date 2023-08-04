package com.example.Strange505.suggestion.controller;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.Strange505.suggestion.dto.SuggestionDTO;
import com.example.Strange505.suggestion.service.SuggestionService;
import java.util.List;

@RestController
@RequestMapping("/api/suggestions")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class SuggestionController {
    @Autowired
    private SuggestionService suggestionService;

    @PostMapping
    public SuggestionDTO createSuggestion(@RequestBody SuggestionDTO suggestionDTO) {
        return suggestionService.createSuggestion(suggestionDTO);
    }

    @PutMapping("/{id}")
    public SuggestionDTO updateSuggestion(@PathVariable Long id, @RequestBody SuggestionDTO suggestionDTO) {
        return suggestionService.updateSuggestion(id, suggestionDTO);
    }

    @GetMapping
    public List<SuggestionDTO> getSuggestions() {
        return suggestionService.getSuggestions();
    }

    @GetMapping("/{id}")
    public SuggestionDTO getSuggestionById(@PathVariable Long id) {
        return suggestionService.getSuggestionById(id);
    }
}
