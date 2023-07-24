package com.example.Strange505.board.service;

import com.example.Strange505.board.dto.ArticleRequestDto;
import com.example.Strange505.board.dto.CommentRequestDto;
import com.example.Strange505.board.dto.CommentResponseDto;
import com.example.Strange505.user.domain.User;

import java.util.List;

public interface CommentService {
    void createComment(CommentRequestDto requestDto);
    CommentResponseDto getCommentById(Long id);
    List<CommentResponseDto> getCommentByArticle(Long articleId);
    List<CommentResponseDto> getCommentByUser(Long userId);
    CommentResponseDto updateComment(Long id, CommentRequestDto requestDto);
    void deleteComment(Long id);
}
