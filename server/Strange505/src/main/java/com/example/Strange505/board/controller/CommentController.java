package com.example.Strange505.board.controller;

import com.example.Strange505.board.dto.CommentRequestDto;
import com.example.Strange505.board.dto.CommentResponseDto;
import com.example.Strange505.board.dto.MypageCommentResponseDto;
import com.example.Strange505.board.service.CommentService;
import com.example.Strange505.dto.PageResponseDto;
import com.example.Strange505.user.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
@Tag(name = "Comment", description = "댓글 API")
public class CommentController {

    private final CommentService commentService;
    private final AuthService authService;

    @PostMapping
    @Operation(summary = "댓글 등록")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "댓글 등록에 성공했습니다."),
            @ApiResponse(responseCode = "401", description = "회원이 아니므로 등록할 수 없습니다."),
            @ApiResponse(responseCode = "500", description = "댓글 등록 과정에서 서버 오류가 발생했습니다."),
    })
    public ResponseEntity<?> registerComment(@RequestBody CommentRequestDto dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        commentService.createComment(dto, email);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PutMapping("/{id}")
    @Operation(summary = "댓글 수정")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "댓글 수정에 성공했습니다."),
            @ApiResponse(responseCode = "401", description = "회원이 아니므로 수정할 수 없습니다."),
            @ApiResponse(responseCode = "500", description = "댓글 수정 과정에서 서버 오류가 발생했습니다."),
    })
    public ResponseEntity<CommentResponseDto> modifyComment(@PathVariable Long id, @RequestBody CommentRequestDto dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        CommentResponseDto commentResponseDto = commentService.updateComment(id, dto, email);
        return new ResponseEntity(commentResponseDto, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "댓글 삭제")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "댓글 삭제에 성공했습니다."),
            @ApiResponse(responseCode = "401", description = "회원이 아니므로 삭제할 수 없습니다."),
            @ApiResponse(responseCode = "500", description = "댓글 삭제 과정에서 서버 오류가 발생했습니다."),
    })
    public ResponseEntity<?> removeComment(@PathVariable Long id) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        commentService.deleteComment(id, email);
        return new ResponseEntity(HttpStatus.OK);
    }


    @GetMapping("/article/{articleId}")
    @Operation(summary = "게시글에 있는 댓글 불러오기")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "게시글의 댓글 조회에 성공했습니다."),
            @ApiResponse(responseCode = "401", description = "회원이 아니므로 조회할 수 없습니다."),
            @ApiResponse(responseCode = "500", description = "게시글 댓글 조회 과정에서 서버 오류가 발생했습니다."),
    })
    public ResponseEntity<PageResponseDto<CommentResponseDto>> getCommentByArticle(@PathVariable Long articleId, Pageable pageable) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        PageResponseDto<CommentResponseDto> response = commentService.getCommentByArticle(articleId, email, pageable);


        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/user")
    @Operation(summary = "유저가 작성한 댓글 불러오기")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "회원이 작성한 댓글 조회에 성공했습니다."),
            @ApiResponse(responseCode = "401", description = "회원이 아니므로 조회할 수 없습니다."),
            @ApiResponse(responseCode = "500", description = "회원이 작성한 댓글 조회 과정에서 서버 오류가 발생했습니다."),
    })
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
    @Operation(summary = "아이디로 댓글 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "아이디로 댓글 조회에 성공했습니다."),
            @ApiResponse(responseCode = "401", description = "회원이 아니므로 조회할 수 없습니다."),
            @ApiResponse(responseCode = "500", description = "아이디로 댓글 조회 과정에서 서버 오류가 발생했습니다."),
    })
    public ResponseEntity<CommentResponseDto> getCommentById(@PathVariable Long id) {
        CommentResponseDto dto = commentService.getCommentById(id);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

}
