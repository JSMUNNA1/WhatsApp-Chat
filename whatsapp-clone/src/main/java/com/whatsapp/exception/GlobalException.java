package com.whatsapp.exception;


import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class GlobalException {
	
	@ExceptionHandler(UserException.class)
	 public ResponseEntity<ErrorDetail>userExceptionHandler(UserException e,WebRequest webRequest){
		 
		 ErrorDetail errorDetail=new ErrorDetail(e.getMessage(), webRequest.getDescription(false), LocalDateTime.now());
	    return new ResponseEntity<ErrorDetail>(errorDetail,HttpStatus.BAD_REQUEST);
	 }
	 
	 @ExceptionHandler(MessageException.class)
    public ResponseEntity<ErrorDetail>messageExceptionHandler(MessageException e,WebRequest webRequest){
		 
		 ErrorDetail errorDetail=new ErrorDetail(e.getMessage(), webRequest.getDescription(false), LocalDateTime.now());
	    return new ResponseEntity<ErrorDetail>(errorDetail,HttpStatus.BAD_REQUEST);
	 }
	 
	  @ExceptionHandler(ChatException.class)
	  public ResponseEntity<ErrorDetail>chatExceptionHandler(ChatException cException,WebRequest webRequest){
		  ErrorDetail errorDetail=new ErrorDetail(cException.getMessage(), webRequest.getDescription(false), LocalDateTime.now());
		  return new ResponseEntity<ErrorDetail>(errorDetail,HttpStatus.BAD_REQUEST);
	  }
	 
	  
	 @ExceptionHandler(Exception.class)
	    public ResponseEntity<ErrorDetail>otherException(Exception e,WebRequest webRequest){
			 
			 ErrorDetail errorDetail=new ErrorDetail(e.getMessage(), webRequest.getDescription(false), LocalDateTime.now());
		    return new ResponseEntity<ErrorDetail>(errorDetail,HttpStatus.BAD_REQUEST);
		 }
	 
	 

}
