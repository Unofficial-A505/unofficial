package com.example.Strange505.board.service;

import com.example.Strange505.board.domain.Article;
import com.example.Strange505.board.domain.Board;
import com.example.Strange505.board.dto.ArticleRequestDto;
import com.example.Strange505.board.repository.ArticleRepository;
import com.example.Strange505.board.repository.BoardRepository;
import com.example.Strange505.user.domain.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {

    private final ArticleRepository articleRepository;
    private final BoardRepository boardRepository;

    @Override
    @Transactional
    public Article createArticle(ArticleRequestDto dto, String jwt) {
        User user = null;
        List<Board> list = boardRepository.searchBoardByName(dto.getBoardName());
        Board board = null;
//        System.out.println("보드 아이디: " + board.getId());
        Article article = Article.createArticle(dto, user, board);
        Article savedArticle = articleRepository.save(article);
        return savedArticle;
    }

    @Override
    public Article getArticleById(Long id) {
        return articleRepository.findById(id).orElseThrow(() -> new RuntimeException("Article not found"));
    }

    @Override
    public List<Article> getAllArticles() {
        return articleRepository.findAll();
    }

    @Override
    public List<Article> getArticlesByTitle(String title) {
        return articleRepository.searchByTitle(title);
    }

    @Override
    public List<Article> getArticlesByContent(String content) {
        return articleRepository.searchByContent(content);
    }

    @Override
    public List<Article> getArticlesByUser(Long userId) {
        return articleRepository.searchByUser(userId);
    }

    @Override
    @Transactional
    public void updateArticle(Long id, ArticleRequestDto articleDTO) { // 게시판 종류 수정은 어떻게?
        Article article = articleRepository.findById(id).orElseThrow(() -> new RuntimeException("Article not found"));
        article.updateArticle(articleDTO);
    }

    @Override
    @Transactional
    public void deleteArticle(Long id) {
        articleRepository.deleteById(id);
    }
}
