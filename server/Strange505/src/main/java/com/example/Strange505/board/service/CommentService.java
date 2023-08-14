package com.example.Strange505.board.service;

import com.example.Strange505.board.dto.ArticleRequestDto;
import com.example.Strange505.board.dto.CommentRequestDto;
import com.example.Strange505.board.dto.CommentResponseDto;
import com.example.Strange505.board.dto.MypageCommentResponseDto;
import com.example.Strange505.dto.PageResponseDto;
import com.example.Strange505.user.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CommentService {
    void createComment(CommentRequestDto requestDto, String email);
    CommentResponseDto getCommentById(Long id);
    PageResponseDto<CommentResponseDto> getCommentByArticle(Long articleId, String email, Pageable pageable);
    Page<MypageCommentResponseDto> getCommentByUser(String email, Pageable pageable);
    CommentResponseDto updateComment(Long id, CommentRequestDto requestDto, String email);
    void deleteComment(Long id, String email);
    void addPoint(Long userId);
}
