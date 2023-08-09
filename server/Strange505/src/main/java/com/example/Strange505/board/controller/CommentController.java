package com.example.Strange505.board.controller;

import com.example.Strange505.board.dto.CommentRequestDto;
import com.example.Strange505.board.dto.CommentResponseDto;
import com.example.Strange505.board.dto.MypageCommentResponseDto;
import com.example.Strange505.board.service.CommentService;
import com.example.Strange505.dto.PageResponseDto;
import com.example.Strange505.user.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;
    private final AuthService authService;

    @PostMapping
    public ResponseEntity<?> registerComment(@RequestBody CommentRequestDto dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        commentService.createComment(dto, email);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CommentResponseDto> modifyComment(@PathVariable Long id, @RequestBody CommentRequestDto dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        CommentResponseDto commentResponseDto = commentService.updateComment(id, dto, email);
        return new ResponseEntity(commentResponseDto, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeComment(@PathVariable Long id) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        commentService.deleteComment(id, email);
        return new ResponseEntity(HttpStatus.OK);
    }


    @GetMapping("/article/{articleId}")
    public ResponseEntity<PageResponseDto<CommentResponseDto>> getCommentByArticle(@PathVariable Long articleId, Pageable pageable) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        PageResponseDto<CommentResponseDto> response = commentService.getCommentByArticle(articleId, email, pageable);


        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<PageResponseDto<MypageCommentResponseDto>> getCommentByUser(Pageable pageable) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Page<MypageCommentResponseDto> list = commentService.getCommentByUser(email, pageable);

        Map<String, Object> pageInfo = new HashMap<>();
        pageInfo.put("page", pageable.getPageNumber());
        pageInfo.put("size", pageable.getPageSize());
        pageInfo.put("totalElements", list.getTotalElements());
        pageInfo.put("totalPages", list.getTotalPages());

        return new ResponseEntity<>(new PageResponseDto<>(pageInfo, list.getContent()), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommentResponseDto> getCommentById(@PathVariable Long id) {
        CommentResponseDto dto = commentService.getCommentById(id);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

}
