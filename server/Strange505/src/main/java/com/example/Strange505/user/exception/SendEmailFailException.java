package com.example.Strange505.user.exception;

public class SendEmailFailException extends RuntimeException{
    public SendEmailFailException() {
        super();
    }

    public SendEmailFailException(String message) {
        super(message);
    }

    public SendEmailFailException(String message, Throwable cause) {
        super(message, cause);
    }

    public SendEmailFailException(Throwable cause) {
        super(cause);
    }
}
