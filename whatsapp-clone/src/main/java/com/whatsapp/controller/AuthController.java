package com.whatsapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.whatsapp.config.TokenProvider;
import com.whatsapp.controller.apiResponce.AuthResponce;
import com.whatsapp.controller.apiResponce.LoginRequest;
import com.whatsapp.entity.User;
import com.whatsapp.exception.UserException;
import com.whatsapp.repository.UserRepository;
import com.whatsapp.service.CustomUserService;

@CrossOrigin("*")
@RestController
@RequestMapping("/auth")
public class AuthController {
	    
	   @Autowired
	    private UserRepository userRepository;
	     
	    @Autowired
	    private CustomUserService customUserService;
	    
	    @Autowired
	    private PasswordEncoder passwordEncoder;
	    
	    @Autowired
	    private TokenProvider tokenProvider;
	    
	    //otp
	 
	    
	     
        @PostMapping( value = "/signup")
	public ResponseEntity<AuthResponce> createUserHandler(@RequestBody User user) throws UserException{
        	 System.out.println(user.toString());
		 String email=user.getEmail();
		 String fullName=user.getFullName();
		 String password=user.getPassword();
		         
		 User createUser=userRepository.findByEmail(email);
		 createUser.setEmail(email);
		 createUser.setFullName(fullName);
		 createUser.setPassword(passwordEncoder.encode(password));
		 userRepository.save(createUser);
		 Authentication authentication=new UsernamePasswordAuthenticationToken(email, password);
		 System.out.println(authentication);
		 SecurityContextHolder.getContext().setAuthentication(authentication); 
		String jwt= tokenProvider.generateToken(authentication);
		System.out.println(jwt);
		AuthResponce responce=new AuthResponce(jwt, true);
		         System.out.println(responce);
		return new ResponseEntity<AuthResponce>(responce,HttpStatus.ACCEPTED);
	}
        
           
	       @PostMapping("/signin")
     public  ResponseEntity<AuthResponce>loginHandler(@RequestBody LoginRequest req){
    	 
    	 String email=req.getEmail();
		
		 String password=req.getPassword();
    	   
		 Authentication authentication=authenticate(email, password);
		 SecurityContextHolder.getContext().setAuthentication(authentication);
		 
		 String jwt= tokenProvider.generateToken(authentication);
			AuthResponce responce=new AuthResponce(jwt, true);
			return new ResponseEntity<AuthResponce>(responce,HttpStatus.ACCEPTED);
		 
    	 
    	
    	 
     }
        
           @PostMapping("/users/profile")
     public Authentication authenticate(String userName,String password) {
    	   UserDetails userDetails=customUserService.loadUserByUsername(userName);
    	   if(userDetails==null) {
    		  throw  new BadCredentialsException("Invalid username");
    	   }
    	   
    	   if(!passwordEncoder.matches(password, userDetails.getPassword())) {
    		   throw new BadCredentialsException("Invalid Password or UserName");
    	   }
    	   
		return new UsernamePasswordAuthenticationToken(userDetails ,null, userDetails.getAuthorities());
     }
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
}
