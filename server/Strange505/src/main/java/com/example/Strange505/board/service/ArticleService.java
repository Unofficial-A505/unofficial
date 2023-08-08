package com.example.Strange505.board.service;

import com.example.Strange505.board.domain.Article;
import com.example.Strange505.board.dto.ArticleRequestDto;
import com.example.Strange505.board.dto.ArticleResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ArticleService {

    ArticleResponseDto createArticle(ArticleRequestDto articleDTO, String email);

    boolean checkUser(Long id, String email);

    ArticleResponseDto getArticleById(Long id, String email);

    Page<ArticleResponseDto> getAllArticles(Pageable pageable);

    Page<ArticleResponseDto> getArticlesByBoard(Long boardId, Pageable pageable);

    Page<ArticleResponseDto> getArticlesByTitleAndContent(String keyword, Long boardId, Pageable pageable);

    Page<ArticleResponseDto> getArticlesByUser(String email, Pageable pageable);

    void updateArticle(ArticleRequestDto dto, String email);

    void deleteArticle(Long id, String email);

    void addViewCount(Long id);

    void addPoint(Long userId);
}
