package com.example.Strange505.board.service;

import com.example.Strange505.board.dto.ArticleLikeRequestDto;

public interface ArticleLikeService {

    void like(ArticleLikeRequestDto dto, String email);

}
