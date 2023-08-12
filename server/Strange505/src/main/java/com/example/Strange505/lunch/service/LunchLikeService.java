package com.example.Strange505.lunch.service;

public interface LunchLikeService {
    Long like(Long lunchId, Long userId);

    Long dislike(Long lunchId, Long userId);

    Long countLike(Long lunchId);

    boolean checkExist(Long lunchId, Long userId);
}
