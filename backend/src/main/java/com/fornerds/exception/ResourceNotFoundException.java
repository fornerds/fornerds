package com.fornerds.exception;

import org.springframework.http.HttpStatus;

public class ResourceNotFoundException extends ApiException {
    public ResourceNotFoundException(String resource) {
        super("RESOURCE_NOT_FOUND", resource + " not found", HttpStatus.NOT_FOUND);
    }
}
