package com.example.Strange505.vo;

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

    public static Result fail(String documents) {
        return new Result(false,documents);
    }
}
