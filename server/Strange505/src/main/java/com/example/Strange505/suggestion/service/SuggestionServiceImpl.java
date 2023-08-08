package com.example.Strange505.suggestion.service;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.stream.Collectors;
import com.example.Strange505.suggestion.dto.SuggestionDTO;
import com.example.Strange505.suggestion.entity.Suggestion;
import com.example.Strange505.suggestion.repository.SuggestionRepository;
@Service
public class SuggestionServiceImpl implements SuggestionService{
    @Autowired
    private SuggestionRepository suggestionRepository;

    private SuggestionDTO toDTO(Suggestion suggestion) {
        return SuggestionDTO.builder()
                .id(suggestion.getId())
                .title(suggestion.getTitle())
                .content(suggestion.getContent())
                .createdDate(suggestion.getCreatedDate())
                .build();
    }

    @Override
    public SuggestionDTO createSuggestion(SuggestionDTO suggestionDTO) {
        Suggestion suggestion = Suggestion.builder()
                .title(suggestionDTO.getTitle())
                .content(suggestionDTO.getContent())
                .createdDate(suggestionDTO.getCreatedDate())
                .build();
        suggestion = suggestionRepository.save(suggestion);
        return toDTO(suggestion);
    }

    @Override
    public SuggestionDTO updateSuggestion(Long id, SuggestionDTO suggestionDTO) {
        Suggestion suggestion = suggestionRepository.findById(id).orElseThrow(() -> new RuntimeException("Suggestion not found"));
        suggestion.update(suggestionDTO);
        suggestion = suggestionRepository.save(suggestion);
        return toDTO(suggestion);
    }

    @Override
    public List<SuggestionDTO> getSuggestions() {
        return suggestionRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public SuggestionDTO getSuggestionById(Long id) {
        Suggestion suggestion = suggestionRepository.findById(id).orElseThrow(() -> new RuntimeException("Suggestion not found"));
        return toDTO(suggestion);
    }
}
