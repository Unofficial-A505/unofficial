package com.example.Strange505.board.service;

import com.example.Strange505.board.domain.Article;
import com.example.Strange505.board.domain.ArticleLike;
import com.example.Strange505.board.domain.BestArticle;
import com.example.Strange505.board.dto.ArticleLikeRequestDto;
import com.example.Strange505.board.exception.NoResultException;
import com.example.Strange505.board.repository.ArticleLikeRepository;
import com.example.Strange505.board.repository.ArticleRepository;
import com.example.Strange505.board.repository.BestArticleRepository;
import com.example.Strange505.user.domain.User;
import com.example.Strange505.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    public void like(ArticleLikeRequestDto dto, String email) {
        Article article = articleRepository.findById(dto.getArticleId())
                .orElseThrow(() -> new NoResultException("게시글이 존재하지 않습니다."));
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NoResultException("사용자가 존재하지 않습니다."));

        // 이미 좋아요 한 경우 다시 누르면 이미 좋아요 했다고 표시
        // 좋아요 안했다면 추가
        if (!articleLikeRepository.findByArticleAndUser(article.getId(), user.getId())) {

            ArticleLike articleLike = ArticleLike.builder()
                    .article(article)
                    .user(user)
                    .build();

            articleLikeRepository.save(articleLike);
            articleRepository.addLikeCount(article);
            // 추천수 5 이상이면 베스트 게시글에 저장
            if (article.getLikes() == 5) {
                bestArticleRepository.save(BestArticle.builder().article(article).build());
            }
        }

    }
}
