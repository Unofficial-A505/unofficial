package com.example.Strange505.suggestion.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Strange505.suggestion.entity.Suggestion;
public interface SuggestionRepository extends JpaRepository<Suggestion, Long>{
}

