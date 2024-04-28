package com.whatsapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.service.annotation.PutExchange;

import com.whatsapp.controller.apiResponce.ApiResponce;
import com.whatsapp.controller.apiResponce.SingleChatRequest;
import com.whatsapp.entity.Chat;
import com.whatsapp.entity.User;
import com.whatsapp.exception.ChatException;
import com.whatsapp.exception.UserException;
import com.whatsapp.service.ChatService;
import com.whatsapp.service.GroupChatRequest;
import com.whatsapp.service.UserService;

@CrossOrigin(origins =  "*")
@RestController
@RequestMapping("/api/chats")
public class ChatController {
	  
	   @Autowired
      private ChatService chatService;
	   @Autowired
      private UserService userService;
	   
	     @PostMapping("/single")
	   public ResponseEntity<Chat>createChatHandler(@RequestBody SingleChatRequest singlechatRequest,@RequestHeader("Authorization")String jwt) throws UserException{
		   
		    User reqUser=userService.findUserProfile(jwt);
		    Chat chat=chatService.createChat(reqUser, singlechatRequest.getUserId());
		    
		    return new ResponseEntity<Chat>(chat,HttpStatus.OK);
		    
		   
	   }
	     @PostMapping("/group")
	     public ResponseEntity<Chat>createGroupHandler(@RequestBody GroupChatRequest gRequest ,@RequestHeader("Authorization")String jwt) throws UserException{
	    	    System.out.println( gRequest);
	    	 User reqUser=userService.findUserProfile(jwt);
	    	 Chat chat=chatService.createGroup(gRequest, reqUser);
	    	 
	    	 return new ResponseEntity<Chat>(chat,HttpStatus.OK);
	    	 
	    	 
	     }
	     @PostMapping("/{chatId}")
	     public ResponseEntity<Chat>findChatByIdHandler(@PathVariable Integer chatId ,@RequestHeader("Authorization")String jwt) throws UserException, ChatException{
	    	 
	    	 User reqUser=userService.findUserProfile(jwt);
	    	 Chat chat=chatService.findChatById(chatId);
	    	 
	    	 return new ResponseEntity<Chat>(chat,HttpStatus.OK);
	    	 
	    	 
	     }
	   
	     @GetMapping("/users")
	     public ResponseEntity<List<Chat>>findAllChatByUserIdHandler(@RequestHeader("Authorization")String jwt) throws UserException{
	    	 
	    	 User reqUser=userService.findUserProfile(jwt);
	    	 List<Chat> chat=chatService.findAllChatByUserId(reqUser.getId());
	    	 
	    	 return new ResponseEntity<List<Chat>>(chat,HttpStatus.OK);
	    	 
	    	 
	     }
	     @PutMapping("/{chatId}/add/{userId}")
	     public ResponseEntity<Chat>addUserToGroupHandler(@PathVariable Integer chatId, @PathVariable Integer userId, @RequestHeader("Authorization")String jwt) throws UserException, ChatException{
	    	 
	    	 User reqUser=userService.findUserProfile(jwt);
	    	 Chat chat=chatService.addUserToGroup(userId, chatId, reqUser);
	    	 
	    	 return new ResponseEntity<Chat>(chat,HttpStatus.OK);
	    	 
	    	 
	     }
	     @PutMapping("/{chatId}/remove/{userId}")
	     public ResponseEntity<Chat>removeUserFromGroupHandler(@PathVariable Integer chatId, @PathVariable Integer userId, @RequestHeader("Authorization")String jwt) throws UserException, ChatException{
	    	 
	    	 User reqUser=userService.findUserProfile(jwt);
	    	 Chat chat=chatService.removeFromGroup(chatId, userId, reqUser);
	    	 
	    	 return new ResponseEntity<Chat>(chat,HttpStatus.OK);
	    	 
	    	 
	     }
	     
	     @DeleteMapping("/delete/{chatId}")
	     public ResponseEntity<ApiResponce>deleteHandler(@PathVariable Integer chatId, @PathVariable Integer userId, @RequestHeader("Authorization")String jwt) throws UserException, ChatException{
	    	 
	    	 User reqUser=userService.findUserProfile(jwt);
	    	 chatService.deleteChat(chatId, reqUser.getId());
	    	 
	    	 return new ResponseEntity<ApiResponce>(new  ApiResponce("DeleteChat",true),HttpStatus.OK);
	    	 
	    	 
	     }
	     
	   
      
}
