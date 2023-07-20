package com.example.Strange505.board.service;

import com.example.Strange505.board.domain.Article;
import com.example.Strange505.board.domain.Board;
import com.example.Strange505.board.dto.ArticleDTO;
import com.example.Strange505.board.dto.BoardDTO;
import com.example.Strange505.board.repository.ArticleRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {

    private final ArticleRepository articleRepository;

    @Override
    public void createArticle(ArticleDTO articleDTO) {
        Article article = Article.builder()
                .id(articleDTO.getId())
                .title(articleDTO.getTitle())
                .content(articleDTO.getContent())
                .user(articleDTO.getUser())
                .board(articleDTO.getBoard())
                .createTime(articleDTO.getCreateTime())
                .modifyTime(articleDTO.getModifyTime())
                .likes(articleDTO.getLikes())
                .views(articleDTO.getViews())
                .build();
        articleRepository.save(article);
        article.addToBoard(articleDTO.getBoard());
    }

    @Override
    public Article getArticleById(Long id) {
        return articleRepository.findById(id).orElseThrow();
    }

    @Override
    public List<Article> getArticlesByBoard(String board) {
        return articleRepository.findByBoard(board).orElseThrow();
    }

    @Override
    public List<Article> getArticlesByTitle(String title) {
        return null;
    }

    @Override
    public List<Article> getArticlesByContent(String content) {
        return null;
    }

    @Override
    public void updateArticle(Long id, ArticleDTO articleDTO) {
        Article article = articleRepository.findById(id).orElseThrow(() -> new RuntimeException("Article not found"));
//        article.update();
    }

    @Override
    public void deleteArticle(Long id) {
        articleRepository.deleteById(id);
    }
}
