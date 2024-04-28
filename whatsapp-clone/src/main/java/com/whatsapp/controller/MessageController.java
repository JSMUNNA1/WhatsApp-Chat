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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.whatsapp.controller.apiResponce.ApiResponce;
import com.whatsapp.entity.Message;
import com.whatsapp.entity.User;
import com.whatsapp.exception.ChatException;
import com.whatsapp.exception.MessageException;
import com.whatsapp.exception.UserException;
import com.whatsapp.service.ChatService;
import com.whatsapp.service.MessageService;
import com.whatsapp.service.UserService;
import com.whatsapp.user.request.SendMessageRequest;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/messages")
public class MessageController {
	  @Autowired
	  private MessageService messageService;
	  @Autowired
	  private UserService userService;
	  @Autowired
	  private ChatService chatService;
	  
	  @PostMapping("/create")
    public ResponseEntity<Message>sendMessageHandler(@RequestBody
			                                     SendMessageRequest req,
			                                     @RequestHeader("Authorization") String jwt) throws UserException, ChatException{
	 User user=userService.findUserProfile(jwt);
	     
	 req.setUserId(user.getId());
	Message message=messageService.sendMessage(req);
	
	return new ResponseEntity<Message>(message,HttpStatus.OK);
	
	
		    
	  }
	  
	  @GetMapping("/chat/{chatId}")
	  public ResponseEntity<List<Message>>getChatsMessageHandler(@PathVariable("chatId")Integer chatId,
			  @RequestHeader("Authorization") String jwt) throws UserException, ChatException{
		  User user=userService.findUserProfile(jwt);	
		
		  List<Message> message=messageService.getChatsMessages(chatId, user);
		  
		  return new ResponseEntity<List<Message>>(message,HttpStatus.OK);
		  
		  
		  
	  }
	  @DeleteMapping("/{messageId}")
	  public ResponseEntity<ApiResponce>deleteMessageHandler(@PathVariable("messageId")Integer messageId,
			  @RequestHeader("Authorization") String jwt) throws UserException, ChatException, MessageException{
		  User user=userService.findUserProfile(jwt);	
		  
		   messageService.deleteMessage(messageId, user);
		  
		  return new ResponseEntity<ApiResponce>(new ApiResponce("Deleted message",true),HttpStatus.OK);
		  
		  
		  
	  }
	  
	  
}
