package com.example.Strange505.board.service;

import com.example.Strange505.board.domain.BestArticle;
import com.example.Strange505.board.dto.BestArticleResponseDto;
import com.example.Strange505.board.repository.BestArticleRepository;
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

    @Override
    public List<BestArticleResponseDto> getAllBestArticles() {
        List<BestArticle> list = bestArticleRepository.findAll();
        List<BestArticleResponseDto> result = list.stream().map(findBestArticle ->
                new BestArticleResponseDto(findBestArticle.getArticle().getTitle(),
                        findBestArticle.getArticle().getLikes(),
                        findBestArticle.getArticle().getUser().getGen(),
                        findBestArticle.getArticle().getUser().getLocal()))
                .toList();
        return result;
    }
}
