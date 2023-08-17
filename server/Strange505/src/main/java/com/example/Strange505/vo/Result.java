package com.example.Strange505.vo;

import lombok.Getter;

@Getter
public class Result<T> {
    private boolean success;
    private T documents;
    private String message;

    public Result(boolean success, T documents) {
        this.success = success;
        this.documents = documents;
    }

    public Result(boolean success, String message) {
        this.success = success;
        this.message = message;
    }
    public static <T> Result success(T documents) {
        return new Result(true,documents);
    }

    public static Result fail(String message) {
        return new Result(false,message);
    }

    public static Result successFail(String message) { return new Result(true,message); }
}
