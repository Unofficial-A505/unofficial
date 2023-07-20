package com.example.Strange505.board.service;

import com.example.Strange505.board.domain.Article;
import com.example.Strange505.board.domain.Board;
import com.example.Strange505.board.dto.ArticleDTO;
import com.example.Strange505.board.repository.ArticleRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService{

    private final ArticleRepository articleRepository;

    @Override
    public void createArticle(ArticleDTO articleDTO) {
//        Board findBoard = findBoardBy
//        Article article = Article.builder().
    }

    @Override
    public ArticleDTO getArticleById(Long id) {
        return null;
    }

    @Override
    public List<ArticleDTO> getAllArticles() {
        return null;
    }

    @Override
    public List<ArticleDTO> getArticlesByTitle(String title) {
        return null;
    }

    @Override
    public List<ArticleDTO> getArticlesByContent(String content) {
        return null;
    }

    @Override
    public void updateArticle(Long id, ArticleDTO articleDTO) {

    }

    @Override
    public void deleteArticle(Long id) {

    }
}
