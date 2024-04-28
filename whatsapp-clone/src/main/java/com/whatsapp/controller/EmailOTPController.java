package com.whatsapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.whatsapp.controller.apiResponce.ApiResponce;
import com.whatsapp.entity.User;
import com.whatsapp.repository.UserRepository;
import com.whatsapp.repository.impl.EmailServiceImpl;
import com.whatsapp.responce.Otp;
import com.whatsapp.service.UserService;
import com.whatsapp.user.request.EmailRequest;
import com.whatsapp.user.request.UserEmailRegister;

import lombok.ToString;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
public class EmailOTPController {
	
	        @Autowired
	       UserRepository userRepository;
	        @Autowired
	       EmailServiceImpl emailService;
	       
	   @PostMapping("/email")
	  public ResponseEntity<ApiResponce>emailOtp(@RequestBody EmailRequest reqEmail){
		    System.err.println(reqEmail.getEmail());
		      
		   User user= userRepository.findByEmail(reqEmail.getEmail());
		   ApiResponce apiResponce;
		    if(user!=null) {
		     apiResponce=new ApiResponce(); 
		     apiResponce.setMessage("Already used this Email");
		     apiResponce.setStatus(false);
		    }else {
		    	   
		    	  emailService.sendEmail(reqEmail.getEmail());
		    	  apiResponce=new ApiResponce();
		    	  apiResponce.setMessage("Otp Sent Successfully...");
		    	  apiResponce.setStatus(true);
		    }
		    
		  return new ResponseEntity<ApiResponce>(apiResponce,HttpStatus.OK);
	 }
        
	   @PostMapping( value = "/otp"  )
	  public ResponseEntity<UserEmailRegister>otpCheck(@RequestBody Otp reqOtp) {
	       
		  UserEmailRegister esponceOtp=emailService.checkOtp(reqOtp.getOtp());
//		   ApiResponce apiResponce=new ApiResponce();
//		   apiResponce.setMessage(reqOtp);
//		   apiResponce.setStatus(true);
		   
		      
		  return new ResponseEntity<UserEmailRegister>(esponceOtp, HttpStatus.OK);
	  }
}
