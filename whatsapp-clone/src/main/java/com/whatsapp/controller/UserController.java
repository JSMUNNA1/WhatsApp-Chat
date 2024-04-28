package com.whatsapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.whatsapp.controller.apiResponce.ApiResponce;
import com.whatsapp.entity.User;
import com.whatsapp.exception.UserException;
import com.whatsapp.service.UserService;
import com.whatsapp.user.request.UpdateUserName;
import com.whatsapp.user.request.UpdateUserRequest;

@CrossOrigin(origins =  "*")
@RestController
@RequestMapping("/api/users")
public class UserController {
	     
	       @Autowired
	       private UserService uService;
	       
	       
   
	 @GetMapping("/profile")
	public ResponseEntity<User> getUserProfileHandler(@RequestHeader("Authorization")String token) throws UserException{
		                                               
		      System.out.println(token);
		 User user=uService.findUserProfile(token);
		 return new ResponseEntity<User>( user,HttpStatus.ACCEPTED);
	}
	 
	   @GetMapping("/{query}")
	 public ResponseEntity<List<User>> searchUserHandler(@PathVariable("query") String q){
		   System.out.println(q+":Mmunn");
		 List<User> users=uService.searchUser(q);
		 System.out.println(users+"yes i am serching the user ");
		 
		 return new ResponseEntity<List<User>>(users,HttpStatus.OK);
	 }
	   
	     @PutMapping("/update")
	   public ResponseEntity<ApiResponce>updateUserHandler(@RequestBody UpdateUserRequest req,@RequestHeader("Authorization")String token) throws UserException{
	    	 User user=uService.findUserProfile(token);
	    	 
	    	 uService.updateUser(user.getId(), req);
	    	 ApiResponce responce=new ApiResponce("user update successfully",true);
	    	 return new ResponseEntity<ApiResponce>(responce,HttpStatus.ACCEPTED);
	   }
	   
	     
	     
	     
	     @PutMapping("userName/update")
	     public ResponseEntity<ApiResponce>updateUserName(@RequestBody UpdateUserName reqUserRequest) throws UserException{
	    	   System.out.print("In update Name:"+reqUserRequest);
	    	// User user=uService.findUserProfile(token);
	    	  uService.updateUserName(752, reqUserRequest);
	    	  
	    	  ApiResponce responce=new ApiResponce("user name updated sucessfully..", true);
	    	  return new ResponseEntity<ApiResponce>(responce,HttpStatus.OK);
	    	  
	    	  
	     }
	   
	   
	   
	   
	   
	   
}
