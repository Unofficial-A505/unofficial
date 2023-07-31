package com.example.Strange505.board.service;

import com.example.Strange505.board.domain.Article;
import com.example.Strange505.board.domain.Board;
import com.example.Strange505.board.dto.ArticleRequestDto;
import com.example.Strange505.board.repository.ArticleRepository;
import com.example.Strange505.board.repository.BoardRepository;
import com.example.Strange505.file.service.ImageService;
import com.example.Strange505.file.service.S3UploaderService;
import com.example.Strange505.user.domain.User;
import com.example.Strange505.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.crossstore.ChangeSetPersister;
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
    private final UserRepository userRepository;
    private final ImageService imageService;

    @Override
    @Transactional
    public Article createArticle(ArticleRequestDto dto, Long userId){
        User user = userRepository.findById(userId).orElseThrow();
        Board board = boardRepository.findByName(dto.getBoardName()).orElseThrow();
        Article article = Article.createArticle(dto, user, board);
        imageService.imageCheck(dto);
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
    public List<Article> getArticlesByBoard(Long boardId) {
        return articleRepository.searchByBoard(boardId);
    }

    @Override
    public List<Article> getArticlesByTitle(String title, Long boardId) {
        return articleRepository.searchByTitle(title, boardId);
    }

    @Override
    public List<Article> getArticlesByContent(String content, Long boardId) {
        return articleRepository.searchByContent(content, boardId);
    }
    @Override
    public List<Article> getArticlesByUser(Long userId) {
        return articleRepository.searchByUser(userId);
    }

    @Override
    @Transactional
    public void updateArticle(Long id, ArticleRequestDto dto) {
        List<Board> list = boardRepository.searchBoardByName(dto.getBoardName());
        Board board = list.get(0);
        Article article = articleRepository.findById(id).orElseThrow(() -> new RuntimeException("Article not found"));
        article.updateArticle(dto, board);
    }

    @Override
    @Transactional
    public void deleteArticle(Long id) {
        articleRepository.deleteById(id);
    }

    @Override
    public void addViewCount(Long id) {
        Article article = articleRepository.findById(id).orElseThrow(() -> new RuntimeException());
        article.addView();
    }

}
