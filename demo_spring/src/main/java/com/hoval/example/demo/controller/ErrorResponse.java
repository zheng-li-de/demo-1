package com.hoval.example.demo.controller;

import com.hoval.example.demo.service.GeneralException;

public class ErrorResponse {
    
    public class ErrorDetail {
		private int code;
		private String message;

		public ErrorDetail(GeneralException ex) {
			this.code = ex.getCode();
			this.message = ex.getMessage();
		}

		public void setCode(int code) {
			this.code = code;
		}

		public int getCode() {
			return this.code;
		}

		public void setMessage(String message) {
			this.message = message;
		}

		public String getMessage() {
			return this.message;
		}
    }
    
    private ErrorDetail error;

    public ErrorResponse(GeneralException ex) {
        this.error = new ErrorDetail(ex);
    }

    public void setError(ErrorDetail error) {
        this.error = error;
    }

    public ErrorDetail getError() {
        return this.error;
    }

}