package com.hoval.example.demo.service;

public class ProfileServiceException extends GeneralException {
 
	public static int PROFILE_NOT_EXIST = 1;
	public static int INVALID_USERNAME = 2;

    private static final long serialVersionUID = -126172088317840224L;

    public ProfileServiceException(int code, String message) {
		super(code, message);
	}

	public ProfileServiceException(int code, String message, Throwable cause) {
		super(code, message, cause);
	}
}