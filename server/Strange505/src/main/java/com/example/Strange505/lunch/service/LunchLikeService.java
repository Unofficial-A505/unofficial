package com.example.Strange505.lunch.service;

public interface LunchLikeService {
    Long like(Long lunchId, Long userId);

    Long dislike(Long lunchId, Long userId);
}
