package com.example.Strange505.board.service;

import com.example.Strange505.board.domain.Article;
import com.example.Strange505.board.domain.Comment;
import com.example.Strange505.board.dto.CommentRequestDto;
import com.example.Strange505.board.dto.CommentResponseDto;
import com.example.Strange505.board.repository.ArticleRepository;
import com.example.Strange505.board.repository.CommentRepository;
import com.example.Strange505.user.domain.User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    private CommentRepository commentRepository;
    private ArticleRepository articleRepository;

    @Override
    public void createComment(CommentRequestDto dto) {
        Article article = articleRepository.getReferenceById(dto.getArticleId());
        Comment parent = commentRepository.findById(dto.getParentId()).orElse(null);
        User user = null;
        Comment comment = Comment.builder()
                .article(article)
                .content(dto.getContent())
                .parent(parent)
                .user(user)
                .build();
        commentRepository.save(comment);
    }

    @Override
    public CommentResponseDto getCommentById(Long id) {
        Comment comment = commentRepository.findById(id).orElseThrow(()->new RuntimeException("Comment not found"));
        return CommentResponseDto.builder()
                .content(comment.getContent())
                .build();
    }

    @Override
    public List<CommentResponseDto> getCommentByArticle(Long articleId) {
        List<Comment> list = commentRepository.searchByArticle(articleId);
        List<CommentResponseDto> dtoList = new ArrayList<>();
        list.stream().forEach(findByArticle -> dtoList.add(new CommentResponseDto(
                findByArticle.getUser().getId(), findByArticle.getArticle().getId(),
                findByArticle.getContent(), findByArticle.getParent().getId())));
        return dtoList;
    }

    @Override
    public List<CommentResponseDto> getCommentByUser(Long userId) {
        List<Comment> list = commentRepository.searchByUser(userId);
        List<CommentResponseDto> dtoList = new ArrayList<>();
        list.stream().forEach(findByArticle -> dtoList.add(new CommentResponseDto(
                findByArticle.getUser().getId(), findByArticle.getArticle().getId(),
                findByArticle.getContent(), findByArticle.getParent().getId())));
        return dtoList;
    }

    @Override
    public CommentResponseDto updateComment(Long id, CommentRequestDto dto) {
        Comment comment = commentRepository.findById(id).orElseThrow(()->new RuntimeException("Comment not found"));
        comment.update(dto.getContent(), LocalDateTime.now());
        Comment save = commentRepository.save(comment);
        return new CommentResponseDto(save);
    }

    @Override
    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }
}
