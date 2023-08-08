package com.example.Strange505.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@NoArgsConstructor
@Getter
@Setter
public class PageResponseDto<T> {

    private Map<String, Object> pageInfo;
    private List<T> content;


    public PageResponseDto(Map<String, Object> pageInfo, List<T> content) {
        this.content = content;
        this.pageInfo = pageInfo;
    }
}
