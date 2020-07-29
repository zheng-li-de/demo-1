package com.hoval.example.demo.controller;

import org.springframework.web.bind.annotation.RestController;

import com.hoval.example.demo.data.Profile;
import com.hoval.example.demo.service.GeneralException;
import com.hoval.example.demo.service.IProfileService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@RestController
@RequestMapping("/api/v1")
public class ApiController {

	@Autowired
	private IProfileService profileService;

	@RequestMapping(
		value = {"/profile/{id:.+}"},
		method = RequestMethod.GET
	)
	public Profile getProfile(@PathVariable(value="id") long id) {
		return profileService.getProfile(id);
	}

	@RequestMapping(
		value = {"/profile/{id:.+}"},
		method = RequestMethod.POST
	)
	public Profile saveProfile(
		@PathVariable(value="id") long id, 
		@RequestBody Profile profile) {
		return profileService.saveProfile(id, profile);
	}

	@ExceptionHandler(GeneralException.class)
	public ResponseEntity<ErrorResponse> handleUncaughtException(GeneralException ex) {
		return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponse(ex));
	}
}