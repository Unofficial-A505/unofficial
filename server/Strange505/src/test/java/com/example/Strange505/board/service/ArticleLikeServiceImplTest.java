//package com.example.Strange505.board.service;
//
//import com.example.Strange505.board.dto.ArticleLikeRequestDto;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.annotation.Commit;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@SpringBootTest
//class ArticleLikeServiceImplTest {
//    @Autowired
//    private ArticleLikeService articleLikeService;
//    @Autowired
//    private ArticleService articleService;
//
//    @Test
//    public void 좋아요() {
//        ArticleLikeRequestDto dto = new ArticleLikeRequestDto(1L, 1L);
//        ArticleLikeRequestDto dto2 = new ArticleLikeRequestDto(1L, 3L);
//        articleLikeService.like(dto);
//        articleLikeService.like(dto2);
//        int likes = articleService.getArticleById(1L).getLikes();
//        org.assertj.core.api.Assertions.assertThat(likes).isEqualTo(2);
//    }
//
//    @Test
//    public void 취소() {
//        ArticleLikeRequestDto dto = new ArticleLikeRequestDto(1L, 1L);
//        articleLikeService.cancel(dto);
//        int likes = articleService.getArticleById(1L).getLikes();
//        org.assertj.core.api.Assertions.assertThat(likes).isEqualTo(0);
//    }
//}