package com.example.Strange505.lunch.service;

import com.example.Strange505.lunch.domain.LunchLikes;
import com.example.Strange505.lunch.repository.LunchLikeRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@Transactional
@RequiredArgsConstructor
public class LunchLikeServiceImpl implements LunchLikeService {
    private final LunchLikeRepository lunchLikeRepository;

    @Override
    public Long like(Long lunchId, Long userId) {
        if (!lunchLikeRepository.existsByLunchIdAndUserId(lunchId, userId)) {
            lunchLikeRepository.save(new LunchLikes(0L,lunchId,userId));
        }
        return countLike(lunchId);
    }

    @Override
    public Long dislike(Long lunchId, Long userId) {
        if (lunchLikeRepository.existsByLunchIdAndUserId(lunchId, userId)) {
            LunchLikes lunchLikes = lunchLikeRepository.findByLunchIdAndUserId(lunchId, userId).orElseThrow();
            lunchLikeRepository.delete(lunchLikes);
        }
        return countLike(lunchId);
    }

    @Override
    public Long countLike(Long lunchId) {
        return lunchLikeRepository.countByLunchId(lunchId);
    }

    @Override
    public boolean checkExist(Long lunchId, Long userId) {
        return lunchLikeRepository.existsByLunchIdAndUserId(lunchId, userId);
    }

}
