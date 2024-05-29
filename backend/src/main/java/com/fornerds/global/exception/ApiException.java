package com.fornerds.global.exception;

import org.springframework.http.HttpStatus;

public class ApiException extends RuntimeException {
    private final String errorCode;
    private final String errorMessage;
    private final HttpStatus httpStatus;

    public ApiException(String errorCode, String errorMessage, HttpStatus httpStatus) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
        this.httpStatus = httpStatus;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
