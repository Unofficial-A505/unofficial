package com.example.Strange505.pointHistory.service;

import com.example.Strange505.dto.PageResponseDto;
import com.example.Strange505.pointHistory.dto.PointHistoryDto;
import com.example.Strange505.pointHistory.dto.PointHistoryResponseDto;
import com.example.Strange505.pointHistory.entity.PointHistory;
import com.example.Strange505.pointHistory.repository.PointHistoryRepository;
import com.example.Strange505.user.domain.User;
import com.example.Strange505.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class PointHistoryServiceImpl implements PointHistoryService {

    private final PointHistoryRepository pointHistoryRepository;
    private final UserRepository userRepository;

    @Override
    public PageResponseDto<PointHistoryResponseDto> getPointHistories(Long userId, Pageable pageable) {
        Page<PointHistory> pagePointHistories = pointHistoryRepository.findByUserIdOrderByActionDateDesc(userId, pageable);
        List<PointHistory> pointHistories = pagePointHistories.getContent();
        List<PointHistoryResponseDto> response = pointHistories.stream().map(PointHistory::convertToDto).collect(Collectors.toList());
        Map<String, Object> pageInfo = new HashMap<>();
        pageInfo.put("page", pageable.getPageNumber());
        pageInfo.put("size", pageable.getPageSize());
        pageInfo.put("totalElements", pagePointHistories.getTotalElements());
        pageInfo.put("totalPages", pagePointHistories.getTotalPages());
        for (PointHistoryResponseDto data : response) {
            System.out.println("start");
            System.out.println(data.getDiff());
            System.out.println(data.getDescription());

        }
        System.out.println(response.size());
        return new PageResponseDto<>(pageInfo, response);
    }

    @Override
    public boolean putNewPointHistory(PointHistoryDto pointHistoryDto) {
        User user = userRepository.findById(pointHistoryDto.getUserId()).get();
        PointHistory pointHistory = new PointHistory();
        // 값 세팅
        pointHistory.setDiff(pointHistoryDto.getDiff());
        pointHistory.setUserId(pointHistoryDto.getUserId());
        pointHistory.setDescription(pointHistoryDto.getDescription());
        pointHistory.setRemainingPoints(user.getPoint() + pointHistory.getDiff());
        if (pointHistory.getRemainingPoints()<0) {
            throw new IllegalArgumentException("포인트는 0 이하가 될 수 없습니다.");
        }
        // 반영
        user.pointAdd(pointHistory.getDiff());
        userRepository.save(user);
        pointHistoryRepository.save(pointHistory);
        return true;
    }


}