package com.app.exc_handler;

import java.util.ArrayList;
import java.util.List;

import javax.validation.ConstraintViolationException;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import com.app.cust_excs.ResourceNotFoundException;
import com.app.dto.ErrorResponse;


@ControllerAdvice // stereotype annotation . Class level annotation .
//Supplies common advice to all controllers  n rest controllers.
public class GlobalExceptionHandler //extends ResponseEntityExceptionHandler 
{
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<?> handleResourceNotFoundException(ResourceNotFoundException exc, WebRequest request) {
		System.out.println("in handle res not found");
		ErrorResponse errResp = new ErrorResponse("Couldn't find the resource you were looking for. Please try again!", request.getDescription(false));
		return new ResponseEntity<>(errResp, HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(ConstraintViolationException.class)
	public ResponseEntity<?> handleConstraintViolationExc(ConstraintViolationException e, WebRequest request) {
		System.out.println("in exc 2!!!");
		ErrorResponse errResp = new ErrorResponse(e.getMessage(), request.getDescription(false));
		return new ResponseEntity<>(errResp, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(DataIntegrityViolationException.class)
	public ResponseEntity<?> handleDataIntegrityViolationExc(DataIntegrityViolationException e, WebRequest request) {
		System.out.println("in exc 3!!!");
		ErrorResponse errResp = new ErrorResponse("Server side error, please repeat your last action again!", request.getDescription(false));
		return new ResponseEntity<>(errResp, HttpStatus.BAD_REQUEST);
	}

	// This Exception is thrown when a method argument fails validation typically
	// due to @Valid style validation
	// or request body content is required.
//	@Override
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
			 WebRequest request) {
		System.out.println("exc 4");
	
		List<String> validationErrs=new ArrayList<>();
		//BindingResult : i/f : represents results of binding between request data n pojo properties
		for(FieldError err : ex.getBindingResult().getFieldErrors())
			validationErrs.add(err.getDefaultMessage());//adds def error messages from binding results
		
		ErrorResponse errResp=new ErrorResponse("Validation Failed", validationErrs.toString());
		return new ResponseEntity<Object>(errResp,HttpStatus.BAD_REQUEST);

	}
	
	@ExceptionHandler(BadCredentialsException.class)
	public ResponseEntity<?> handleBadCredentials(BadCredentialsException ex, WebRequest request) {
		ErrorResponse errResp = new ErrorResponse("Invalid Credentials. Please try again!", request.getDescription(false));
		return new ResponseEntity<>(errResp, HttpStatus.NOT_FOUND); 
	}

	// handle ANY exception -- equivalent to catch-all 
	@ExceptionHandler(Exception.class)
	public ResponseEntity<?> handleAnyException(Exception exc, WebRequest request) {
		System.out.println("in handle exc");
		ErrorResponse errResp = new ErrorResponse(exc.getMessage(), request.getDescription(false));
		return new ResponseEntity<>(errResp, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	
	
}
