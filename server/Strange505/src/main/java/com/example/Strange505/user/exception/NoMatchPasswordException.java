package com.example.Strange505.user.exception;

public class NoMatchPasswordException extends RuntimeException{
    public NoMatchPasswordException() {
        super();
    }

    public NoMatchPasswordException(String message) {
        super(message);
    }

    public NoMatchPasswordException(String message, Throwable cause) {
        super(message, cause);
    }

    public NoMatchPasswordException(Throwable cause) {
        super(cause);
    }
}
