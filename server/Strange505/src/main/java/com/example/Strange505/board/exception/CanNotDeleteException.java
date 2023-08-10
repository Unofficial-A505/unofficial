package com.example.Strange505.board.exception;

public class CanNotDeleteException extends RuntimeException {
    public CanNotDeleteException() {
        super();
    }

    public CanNotDeleteException(String message) {
        super(message);
    }
}
