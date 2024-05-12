package com.fornerds.exception;

import org.springframework.http.HttpStatus;

public class UnauthorizedException extends ApiException {
    public UnauthorizedException() {
        super("UNAUTHORIZED", "Unauthorized access", HttpStatus.UNAUTHORIZED);
    }
}
