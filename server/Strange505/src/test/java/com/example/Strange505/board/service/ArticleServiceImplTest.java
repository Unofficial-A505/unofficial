package com.example.Strange505.board.service;

import com.example.Strange505.board.domain.Article;
import com.example.Strange505.board.domain.Board;
import com.example.Strange505.board.dto.ArticleRequestDTO;
import com.example.Strange505.board.dto.BoardDTO;
import com.example.Strange505.board.repository.BoardRepository;
import com.example.Strange505.user.domain.User;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class ArticleServiceImplTest {

    @Autowired
    private ArticleService articleService;

    @Autowired
    private BoardRepository boardRepository;

    @Test
    public void 게시글_생성_및_검색() {

        Board board = Board.builder().name("게시판")
                .createTime(LocalDateTime.now())
                .modifyTime(LocalDateTime.now())
                .build();
        boardRepository.save(board);
        ArticleRequestDTO articleDTO = ArticleRequestDTO.builder()
                .title("제목")
                .content("내용")
                .boardName(board.getName())
                .build();

        Article savedArticle = articleService.createArticle(articleDTO, "");
        List<Article> articles = articleService.getArticlesByTitle("제목");
        Article searchedArticle = articles.get(0);
        assertThat("제목").isEqualTo(searchedArticle.getTitle());
        System.out.println("생성시간 : " + searchedArticle.getCreateTime());
    }

//    @Test
//    public void 게시글_제목_검색() {
//        ArticleRequestDTO articleDTO = ArticleRequestDTO.builder()
//                .title("제목")
//                .content("내용")
//                .boardName()
//                .build();
//
//        Article savedArticle = articleService.createArticle(articleDTO, "");
//        articleService.getArticlesByTitle("제목");
//    }

}