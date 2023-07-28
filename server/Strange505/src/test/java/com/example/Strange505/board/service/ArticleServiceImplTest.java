//package com.example.Strange505.board.service;
//
//import com.example.Strange505.board.domain.Article;
//import com.example.Strange505.board.domain.Board;
//import com.example.Strange505.board.dto.ArticleRequestDto;
//import com.example.Strange505.board.repository.BoardRepository;
//import jakarta.transaction.Transactional;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.annotation.Commit;
//
//import java.time.LocalDateTime;
//import java.util.List;
//
//import static org.assertj.core.api.Assertions.assertThat;
//
//@SpringBootTest
//@Transactional
//@Commit
//class ArticleServiceImplTest {
//
//    @Autowired
//    private ArticleService articleService;
//
//    @Autowired
//    private BoardRepository boardRepository;
//
//    @Test
//    public void 게시글_생성() {
//
//        Board board = Board.builder().name("게시판")
//                .createTime(LocalDateTime.now())
//                .modifyTime(LocalDateTime.now())
//                .build();
////        boardRepository.save(board);
//        ArticleRequestDto articleDTO = ArticleRequestDto.builder()
//                .title("제목")
//                .content("내용")
//                .boardName(board.getName())
//                .build();
//
//        Article savedArticle = articleService.createArticle(articleDTO, 1L);
//        Long id = savedArticle.getId();
//        Article searchedArticle = articleService.getArticleById(id);
//        assertThat(savedArticle).isEqualTo(searchedArticle);
//        System.out.println("생성시간 : " + searchedArticle.getCreateTime());
//    }
//
//    @Test
//    public void 게시글_제목_검색() {
//        ArticleRequestDto articleDTO = ArticleRequestDto.builder()
//                .title("제목")
//                .content("내용")
//                .boardName("게시판")
//                .build();
//        Article savedArticle = articleService.createArticle(articleDTO, 1L);
//
//        List<Article> searchedList = articleService.getArticlesByTitle("제", 0L);
//        Article searchedArticle = searchedList.get(0);
//        assertThat(searchedArticle.getTitle()).contains("제");
//    }
//
//    @Test
//    public void 게시글_내용_검색() {
//        ArticleRequestDto articleDTO = ArticleRequestDto.builder()
//                .title("제목")
//                .content("내용")
//                .boardName("게시판")
//                .build();
//        Article savedArticle = articleService.createArticle(articleDTO, 1L);
//
//        List<Article> searchedList = articleService.getArticlesByContent("용", 0L);
//        Article searchedArticle = searchedList.get(0);
//        assertThat(searchedArticle.getContent()).contains("용");
//    }
//
//    @Test
//    public void 게시글_사용자_검색() {
//        ArticleRequestDto articleDTO = ArticleRequestDto.builder()
//                .title("제목")
//                .content("내용")
//                .boardName("게시판")
//                .build();
//        Article savedArticle = articleService.createArticle(articleDTO, 1L);
//
//        List<Article> searchedList = articleService.getArticlesByUser(1L);
//        Article searchedArticle = searchedList.get(0);
//        assertThat(searchedArticle.getUser().getId()).isEqualTo(1L);
//    }
//
//    @Test
//    public void 게시글_수정() {
//        ArticleRequestDto articleDTO = ArticleRequestDto.builder()
//                .title("수정_제목")
//                .content("수정_내용")
//                .boardName("게시판")
//                .build();
//        articleService.updateArticle(1L, articleDTO);
//        List<Article> articles = articleService.getArticlesByContent("내", 0L);
//        Article searchedArticle = articles.get(0);
//        assertThat("수정_제목").isEqualTo(searchedArticle.getTitle());
//    }
//
//    @Test
//    public void 게시글_삭제() {
//        ArticleRequestDto articleDTO = ArticleRequestDto.builder()
//                .title("2_제목")
//                .content("2_내용")
//                .boardName("2_게시판")
//                .build();
//
//        Article savedArticle = articleService.createArticle(articleDTO, 1L);
//        articleService.deleteArticle(savedArticle.getId());
//        List<Article> articles = articleService.getAllArticles();
//        assertThat(articles.size()).isEqualTo(1);
//
//    }
//
//    @Test
//    public void 조회수_증가() {
//        ArticleRequestDto articleDTO = ArticleRequestDto.builder()
//                .title("제목")
//                .content("내용")
//                .boardName("게시판")
//                .build();
//        Article savedArticle = articleService.createArticle(articleDTO, 1L);
//
//        articleService.addViewCount(1L);
//        assertThat(savedArticle.getViews()).isEqualTo(1);
//    }
//
//}