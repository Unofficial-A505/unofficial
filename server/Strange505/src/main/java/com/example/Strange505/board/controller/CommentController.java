package com.example.Strange505.board.controller;

import com.example.Strange505.board.domain.Comment;
import com.example.Strange505.board.dto.CommentRequestDto;
import com.example.Strange505.board.dto.CommentResponseDto;
import com.example.Strange505.board.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;
    
    @PostMapping("/api/articles/{articleId}/comments")
    public ResponseEntity<?> registerComment(@RequestBody CommentRequestDto dto) {
        commentService.createComment(dto);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PutMapping("/api/articles/{articleId}/comments/{id}")
    public ResponseEntity<CommentResponseDto> modifyComment(@PathVariable Long id, @RequestBody CommentRequestDto dto) {
        CommentResponseDto commentResponseDto = commentService.updateComment(id, dto);
        return new ResponseEntity(commentResponseDto, HttpStatus.OK);
    }

    @DeleteMapping("/api/articles/{articleId}/comments/{id}")
    public ResponseEntity<?> removeComment(@PathVariable Long id) {
        commentService.deleteComment(id);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/api/commentsById/{id}")
    public ResponseEntity<CommentResponseDto> getCommentById(@PathVariable Long id) {
        CommentResponseDto dto = commentService.getCommentById(id);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @GetMapping("/api/articles/{articleId}/comments")
    public ResponseEntity<List<CommentResponseDto>> getCommentByArticle(@PathVariable Long articleId) {
        List<CommentResponseDto> list = commentService.getCommentByArticle(articleId);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/api/commentsByUser/{userId}")
    public ResponseEntity<List<CommentResponseDto>> getCommentByUser(@PathVariable Long userId) {
        List<CommentResponseDto> list = commentService.getCommentByUser(userId);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}