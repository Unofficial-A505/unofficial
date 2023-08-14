package com.example.Strange505.board.controller;


import com.example.Strange505.board.dto.ArticleListResponseDto;
import com.example.Strange505.board.dto.ArticleRequestDto;
import com.example.Strange505.board.dto.ArticleResponseDto;
import com.example.Strange505.board.dto.ImageForm;
import com.example.Strange505.board.service.ArticleLikeService;
import com.example.Strange505.board.service.ArticleService;
import com.example.Strange505.dto.PageResponseDto;
import com.example.Strange505.file.service.S3UploaderService;
import com.example.Strange505.user.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
@Tag(name = "Article", description = "게시글 API")
public class ArticleController {

    private final ArticleService articleService;
    private final S3UploaderService s3Uploader;
    private final AuthService authService;
    private final ArticleLikeService articleLikeService;

    @Operation(summary = "게시글 등록")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "게시글 등록에 성공했습니다."),
            @ApiResponse(responseCode = "500", description = "게시글 등록 과정에서 서버 오류가 발생했습니다."),
    })
    @PostMapping
    public ResponseEntity<?> registerArticle(@RequestBody ArticleRequestDto dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        ArticleResponseDto responseDto = articleService.createArticle(dto, email);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);

    }

    @Operation(summary = "게시글 수정")
    @PutMapping("/{id}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "게시글 수정에 성공했습니다."),
            @ApiResponse(responseCode = "401", description = "작성자가 아니므로 수정할 수 없습니다."),
            @ApiResponse(responseCode = "500", description = "게시글 수정 과정에서 서버 오류가 발생했습니다."),
    })
    public ResponseEntity<?> modifyArticle(@RequestBody ArticleRequestDto dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        articleService.updateArticle(dto, email);
        return new ResponseEntity(HttpStatus.OK);
    }

    @Operation(summary = "게시글 삭제")
    @DeleteMapping("/{id}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "게시글 삭제에 성공했습니다."),
            @ApiResponse(responseCode = "401", description = "작성자가 아니므로 삭제할 수 없습니다."),
            @ApiResponse(responseCode = "500", description = "게시글 삭제 과정에서 서버 오류가 발생했습니다."),
    })
    public ResponseEntity<?> removeArticle(@PathVariable Long id) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        articleService.deleteArticle(id, email);
        return new ResponseEntity(HttpStatus.OK);
    }

    @Operation(summary = "게시글 아이디로 조회")
    @GetMapping("/{id}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "게시글 조회에 성공했습니다."),
            @ApiResponse(responseCode = "401", description = "회원이 아니므로 조회할 수 없습니다."),
            @ApiResponse(responseCode = "500", description = "게시글 조회 과정에서 서버 오류가 발생했습니다."),
    })
    public ResponseEntity<ArticleResponseDto> getArticle(@PathVariable Long id, HttpServletRequest req, HttpServletResponse res) {
        // 조회수 증가
        addViewCount(id, req, res);
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        ArticleResponseDto responseDto = articleService.getArticleById(id, email);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @Operation(summary = "모든 게시글 조회")
    @GetMapping
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "게시글 모두 조회에 성공했습니다."),
            @ApiResponse(responseCode = "401", description = "회원이 아니므로 조회할 수 없습니다."),
            @ApiResponse(responseCode = "500", description = "게시글 모두 조회 과정에서 서버 오류가 발생했습니다."),
    })
    public ResponseEntity<PageResponseDto<ArticleListResponseDto>> getAllArticles(Pageable pageable) {
        Page<ArticleListResponseDto> responseDtoList = articleService.getAllArticles(pageable);

        Map<String, Object> pageInfo = new HashMap<>();
        pageInfo.put("page", pageable.getPageNumber());
        pageInfo.put("size", pageable.getPageSize());
        pageInfo.put("totalElements", responseDtoList.getTotalElements());
        pageInfo.put("totalPages", responseDtoList.getTotalPages());
        List<ArticleListResponseDto> contents = responseDtoList.getContent();


        return new ResponseEntity<>(new PageResponseDto<>(pageInfo, contents), HttpStatus.OK);
    }

    @Operation(summary = "제목과 내용에 키워드가 포함된 게시글 조회")
    @GetMapping("/search")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "게시글 검색에 성공했습니다."),
            @ApiResponse(responseCode = "401", description = "회원이 아니므로 검색할 수 없습니다."),
            @ApiResponse(responseCode = "500", description = "게시글 검색 과정에서 서버 오류가 발생했습니다."),
    })
    public ResponseEntity<PageResponseDto<ArticleListResponseDto>> getArticlesByTitleAndContent(@RequestParam String keyword, @RequestParam Long boardId, Pageable pageable) {
        Page<ArticleListResponseDto> responseDtoList = articleService.getArticlesByTitleAndContent(keyword, boardId, pageable);

        Map<String, Object> pageInfo = new HashMap<>();
        pageInfo.put("page", pageable.getPageNumber());
        pageInfo.put("size", pageable.getPageSize());
        pageInfo.put("totalElements", responseDtoList.getTotalElements());
        pageInfo.put("totalPages", responseDtoList.getTotalPages());
        List<ArticleListResponseDto> contents = responseDtoList.getContent();

        return new ResponseEntity<>(new PageResponseDto<>(pageInfo, contents), HttpStatus.OK);
    }

    @Operation(summary = "게시글 작성자로 조회")
    @GetMapping("/user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "회원이 작성한 게시글 조회에 성공했습니다."),
            @ApiResponse(responseCode = "401", description = "회원이 아니므로 조회할 수 없습니다."),
            @ApiResponse(responseCode = "500", description = "회원이 작성한 게시글 조회 과정에서 서버 오류가 발생했습니다."),
    })
    public ResponseEntity<PageResponseDto<ArticleListResponseDto>> getArticlesByUser(Pageable pageable) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Page<ArticleListResponseDto> responseDtoList = articleService.getArticlesByUser(email, pageable);

        Map<String, Object> pageInfo = new HashMap<>();
        pageInfo.put("page", pageable.getPageNumber());
        pageInfo.put("size", pageable.getPageSize());
        pageInfo.put("totalElements", responseDtoList.getTotalElements());
        pageInfo.put("totalPages", responseDtoList.getTotalPages());
        List<ArticleListResponseDto> contents = responseDtoList.getContent();

        return new ResponseEntity<>(new PageResponseDto<>(pageInfo, contents), HttpStatus.OK);
    }

    @Operation(summary = "게시글이 등록된 게시판 종류에 따라 조회")
    @GetMapping("/board/{boardId}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "게시판 종류에 따른 게시글 조회에 성공했습니다."),
            @ApiResponse(responseCode = "401", description = "회원이 아니므로 조회할 수 없습니다."),
            @ApiResponse(responseCode = "500", description = "게시판 종류에 따른 게시글 조회 과정에서 서버 오류가 발생했습니다."),
    })
    public ResponseEntity<PageResponseDto<ArticleListResponseDto>> getArticlesByBoard(@PathVariable Long boardId, Pageable pageable) {
        Page<ArticleListResponseDto> responseDtoList = articleService.getArticlesByBoard(boardId, pageable);

        Map<String, Object> pageInfo = new HashMap<>();
        pageInfo.put("page", pageable.getPageNumber());
        pageInfo.put("size", pageable.getPageSize());
        pageInfo.put("totalElements", responseDtoList.getTotalElements());
        pageInfo.put("totalPages", responseDtoList.getTotalPages());
        List<ArticleListResponseDto> contents = responseDtoList.getContent();


        return new ResponseEntity<>(new PageResponseDto<>(pageInfo, contents), HttpStatus.OK);
    }

    @Operation(summary = "게시글 조회 시 조회수 증가")
    private void addViewCount(Long id, HttpServletRequest req, HttpServletResponse res) {
        Cookie oldCookie = null;

        Cookie[] cookies = req.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("boardView")) {
                    oldCookie = cookie;
                }
            }
        }

        if (oldCookie != null) {
            if (!oldCookie.getValue().contains("[" + id.toString() + "]")) {
                articleService.addViewCount(id);
                oldCookie.setValue(oldCookie.getValue() + "_[" + id + "]");
                oldCookie.setPath("/");
                oldCookie.setMaxAge(60 * 60 * 24);
                res.addCookie(oldCookie);
            }
        } else {
            articleService.addViewCount(id);
            Cookie newCookie = new Cookie("boardView", "[" + id + "]");
            newCookie.setPath("/");
            newCookie.setMaxAge(60 * 60 * 24);
            res.addCookie(newCookie);
        }
    }

    @PostMapping("/image")
    @ResponseBody
    @Operation(summary = "이미지 한 개 업로드")
    public ResponseEntity<String> upload(@ModelAttribute ImageForm form) throws IOException {
        MultipartFile file = form.getUploadFile().get(0);
        String imageUrl = null;

        // 여기서 마지막 파일의 URL만 반환됩니다. 여러 파일의 경우 로직 변경이 필요합니다.
        imageUrl = s3Uploader.upload(file, "article");


        return ResponseEntity.ok(imageUrl);
    }

    @PostMapping("/images")
    @ResponseBody
    @Operation(summary = "이미지 여러 개 업로드")
    public ResponseEntity<List<String>> uploads(@ModelAttribute ImageForm form) throws IOException {
        List<MultipartFile> files = form.getUploadFile();
        List<String> imageUrl = null;

        // 여기서 마지막 파일의 URL만 반환됩니다. 여러 파일의 경우 로직 변경이 필요합니다.
        for (MultipartFile file : files) {
            imageUrl.add(s3Uploader.upload(file, "article"));
        }

        return ResponseEntity.ok(imageUrl);
    }
}
