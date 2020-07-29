package com.hoval.example.demo.service;

public class GeneralException extends RuntimeException {

    private static final long serialVersionUID = 1849453644247845328L;
    
    private int code = 0;

    public GeneralException(int code, String message) {
		this(code, message, null);
    }
    
    public GeneralException(int code, String message, Throwable cause) {
        super(message, cause);
        this.code = code;
    }

    public int getCode() {
        return this.code;
    }
}