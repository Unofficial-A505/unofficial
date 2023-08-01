//package com.example.Strange505.board.service;
//
//import com.example.Strange505.board.domain.Article;
//import com.example.Strange505.board.domain.Board;
//import com.example.Strange505.board.dto.ArticleRequestDto;
//import com.example.Strange505.board.repository.ArticleRepository;
//import com.example.Strange505.board.repository.BoardRepository;
//import com.example.Strange505.user.domain.User;
//import com.example.Strange505.user.dto.AuthDto;
//import com.example.Strange505.user.repository.UserRepository;
//import jakarta.transaction.Transactional;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import java.time.LocalDateTime;
//import java.util.NoSuchElementException;
//
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.assertj.core.api.Assertions.assertThatThrownBy;
//
//@SpringBootTest
//@Transactional
//class ArticleServiceImplTest {
//
//    @Autowired
//    private ArticleService articleService;
//
//    @Autowired
//    private ArticleRepository articleRepository;
//
//    @Autowired
//    private BoardRepository boardRepository;
//
//    @Autowired
//    private UserRepository userRepository;
//
//    private final static String EMAIL = "asdasd@ASdasd";
//    private final static String BOARD_NAME = "1기";
//    private Long article_id;
//
//    @BeforeEach
//    public void init() throws Exception {
//        AuthDto.SignupDto signupDto = AuthDto.SignupDto
//                .builder()
//                .password("1234")
//                .gen(1)
//                .email(EMAIL)
//                .local("asd").build();
//        User user = User.registerUser(signupDto);
//        userRepository.save(user);
//
//        Board board = Board.builder().name(BOARD_NAME)
//                .createTime(LocalDateTime.now())
//                .modifyTime(LocalDateTime.now())
//                .build();
//        boardRepository.save(board);
//
//        ArticleRequestDto articleDTO = ArticleRequestDto.builder()
//                .title("제목")
//                .content("내용")
//                .boardName(BOARD_NAME)
//                .build();
//
//        User findUser = userRepository.findByEmail(EMAIL).orElseThrow(() -> new NoSuchElementException("user not found"));
//        Article savedArticle = articleService.createArticle(articleDTO, findUser.getId());
//        article_id = savedArticle.getId();
//    }
//
//    @Test
//    public void 게시물_생성() {
//
//        ArticleRequestDto articleDTO = ArticleRequestDto.builder()
//                .title("제목1")
//                .content("내용1")
//                .boardName(BOARD_NAME)
//                .build();
//
//        User findUser = userRepository.findByEmail(EMAIL).orElseThrow(() -> new RuntimeException("user not found"));
//        Article savedArticle = articleService.createArticle(articleDTO, findUser.getId());
//        Long id = savedArticle.getId();
//        Article searchedArticle = articleService.getArticleById(id);
//        assertThat(savedArticle).isEqualTo(searchedArticle);
//    }
//
//    @Test
//    public void 게시글_제목_검색() {
//        ArticleRequestDto articleDTO = ArticleRequestDto.builder()
//                .title("제목")
//                .content("내용")
//                .boardName(BOARD_NAME)
//                .build();
//        User findUser = userRepository.findByEmail(EMAIL).orElseThrow(() -> new RuntimeException("user not found"));
//        articleService.createArticle(articleDTO, findUser.getId());
//        Article searchedArticle = articleRepository.findById(article_id).orElseThrow();
//        assertThat(searchedArticle.getTitle()).contains("제");
//    }
//
//    @Test
//    public void 게시글_수정() {
//        ArticleRequestDto articleDTO = ArticleRequestDto.builder()
//                .title("수정_제목")
//                .content("수정_내용")
//                .boardName(BOARD_NAME)
//                .build();
//        articleService.updateArticle(article_id, articleDTO);
//        Article searchedArticle = articleRepository.findById(article_id).orElseThrow();
//        assertThat("수정_제목").isEqualTo(searchedArticle.getTitle());
//    }
//
//    @Test
//    public void 게시글_삭제() {
//        ArticleRequestDto articleDTO = ArticleRequestDto.builder()
//                .title("2_제목")
//                .content("2_내용")
//                .boardName(BOARD_NAME)
//                .build();
//        User findUser = userRepository.findByEmail(EMAIL).orElseThrow();
//        Article savedArticle = articleService.createArticle(articleDTO, findUser.getId());
//        articleService.deleteArticle(savedArticle.getId());
//        assertThatThrownBy(() -> articleRepository.findById(savedArticle.getId()).orElseThrow())
//                .isInstanceOf(NoSuchElementException.class);
//    }
//
//    @Test
//    public void 조회수_증가() {
//        ArticleRequestDto articleDTO = ArticleRequestDto.builder()
//                .title("제목")
//                .content("내용")
//                .boardName(BOARD_NAME)
//                .build();
//        User findUser = userRepository.findByEmail(EMAIL).orElseThrow();
//        Article savedArticle = articleService.createArticle(articleDTO, findUser.getId());
//
//        articleService.addViewCount(savedArticle.getId());
//        assertThat(savedArticle.getViews()).isEqualTo(1);
//    }
//
//}
