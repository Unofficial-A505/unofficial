package com.example.Strange505.board.service;

import com.example.Strange505.board.domain.BestArticle;
import com.example.Strange505.board.dto.BestArticleResponseDto;
import com.example.Strange505.board.repository.BestArticleRepository;
import com.example.Strange505.board.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BestArticleServiceImpl implements BestArticleService{

    private final BestArticleRepository bestArticleRepository;
    private final CommentRepository commentRepository;

    @Override
    public List<BestArticleResponseDto> getAllBestArticles() {
        List<BestArticle> list = bestArticleRepository.findTop15ByOrderByIdDesc();
        List<BestArticleResponseDto> result = list.stream().map(findBestArticle ->
                new BestArticleResponseDto(findBestArticle.getArticle().getTitle(),
                        findBestArticle.getArticle().getLikes(),
                        findBestArticle.getArticle().getViews(),
                        findBestArticle.getArticle().getUser().getGen(),
                        findBestArticle.getArticle().getUser().getLocal(),
                        findBestArticle.getArticle().getBoard().getId(),
                        findBestArticle.getArticle().getBoard().getName(),
                        findBestArticle.getArticle().getId(),
                        commentRepository.getCountByArticle(findBestArticle.getArticle().getId()),
                        findBestArticle.getArticle().getCreateTime()))
                .toList();
        return result;
    }
}
