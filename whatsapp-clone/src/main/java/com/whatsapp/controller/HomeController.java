package com.whatsapp.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
public class HomeController {
          
	    @GetMapping("/")
	   public ResponseEntity<String>HomeController(){
		   return new ResponseEntity<String>("Welcome to our APp",HttpStatus.OK);
	   }
	
}
