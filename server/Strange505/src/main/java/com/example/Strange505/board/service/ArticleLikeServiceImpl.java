package com.example.Strange505.board.service;

import com.example.Strange505.board.domain.Article;
import com.example.Strange505.board.domain.ArticleLike;
import com.example.Strange505.board.domain.BestArticle;
import com.example.Strange505.board.dto.ArticleLikeRequestDto;
import com.example.Strange505.board.repository.ArticleLikeRepository;
import com.example.Strange505.board.repository.ArticleRepository;
import com.example.Strange505.board.repository.BestArticleRepository;
import com.example.Strange505.user.domain.User;
import com.example.Strange505.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ArticleLikeServiceImpl implements ArticleLikeService {

    public final ArticleLikeRepository articleLikeRepository;
    public final ArticleRepository articleRepository;
    public final UserRepository userRepository;
    public final BestArticleRepository bestArticleRepository;

    @Override
    public void like(ArticleLikeRequestDto dto) {
        Article article = articleRepository.findById(dto.getArticleId())
                .orElseThrow(() -> new RuntimeException());
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException());

        if (articleLikeRepository.findByArticleAndUser(article, user).isPresent()) {
            throw new RuntimeException();
        }

        ArticleLike articleLike = ArticleLike.builder()
                .article(article)
                .user(user)
                .build();

        articleLikeRepository.save(articleLike);
        articleRepository.addLikeCount(article);
        // 추천수 10 이상이면 베스트 게시글에 저장
        if (article.getLikes() == 10) {
            bestArticleRepository.save(BestArticle.builder().article(article).build());
        }
    }

    @Override
    public void cancel(ArticleLikeRequestDto dto) {
        Article article = articleRepository.findById(dto.getArticleId())
                .orElseThrow(() -> new RuntimeException());
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException());
        ArticleLike articleLike = articleLikeRepository.findByArticleAndUser(article, user)
                .orElseThrow(() -> new RuntimeException());

        articleLikeRepository.delete(articleLike);
        articleRepository.subLikeCount(article);
    }
}
