package com.example.Strange505.user.exception;

public class NotActivatedException extends RuntimeException{
    public NotActivatedException() {
        super();
    }

    public NotActivatedException(String message) {
        super(message);
    }

    public NotActivatedException(String message, Throwable cause) {
        super(message, cause);
    }

    public NotActivatedException(Throwable cause) {
        super(cause);
    }
}
