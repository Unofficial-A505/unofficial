package com.example.Strange505.suggestion.service;
import java.util.List;
import com.example.Strange505.suggestion.dto.SuggestionDTO;
public interface SuggestionService {
    SuggestionDTO createSuggestion(SuggestionDTO suggestionDTO);
    SuggestionDTO updateSuggestion(Long id, SuggestionDTO suggestionDTO);
    List<SuggestionDTO> getSuggestions();
    SuggestionDTO getSuggestionById(Long id);
}
