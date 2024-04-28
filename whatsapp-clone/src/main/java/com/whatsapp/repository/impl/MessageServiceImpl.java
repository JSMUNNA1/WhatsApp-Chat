package com.whatsapp.repository.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.whatsapp.entity.Chat;
import com.whatsapp.entity.Message;
import com.whatsapp.entity.User;
import com.whatsapp.exception.ChatException;
import com.whatsapp.exception.MessageException;
import com.whatsapp.exception.UserException;
import com.whatsapp.repository.MessageRepository;
import com.whatsapp.service.ChatService;
import com.whatsapp.service.MessageService;
import com.whatsapp.service.UserService;
import com.whatsapp.user.request.SendMessageRequest;

@Service
public class MessageServiceImpl implements MessageService {
            
	@Autowired
	  private MessageRepository messageRepository;
	  @Autowired
	  private UserService userService;
	  @Autowired
	  private ChatService chatService;
	
	public Message sendMessage(SendMessageRequest req) throws UserException, ChatException {
         
	User user=userService.findUserById(req.getUserId());
	Chat chat=chatService.findChatById(req.getChatId());
	 Message message=new Message();
	 message.setChat(chat);
	 message.setUser(user);
	 message.setContent(req.getContent());
	 message.setTimeStamp(LocalDateTime.now());     
		return messageRepository.save(message);
		}

	public List<Message> getChatsMessages(Integer chatId,User reqUser) throws ChatException, UserException {
	    Chat chat=chatService.findChatById(chatId);
	   if(!chat.getUsers().contains(reqUser) ) {
		     throw new UserException("You Are Not related to this chat "+chat.getId());
	   }
		List<Message>messages=messageRepository.findByChatId(chat.getId());
		return messages;
	}

	
	public Message findMessageById(Integer messageId) throws MessageException {
		   Optional<Message> opt=messageRepository.findById(messageId);
		    if(opt.isPresent()) {
		    	return opt.get();
		    }
		throw new MessageException("Message not found with id"+messageId);
	}

	
	public void deleteMessage(Integer messageId,User reqUser) throws MessageException, UserException {
      
		Message message=findMessageById(messageId);
		  if(message.getUser().getId().equals(reqUser.getId())) {
			  messageRepository.deleteById(messageId);
		  }
    throw new UserException("You can't delete another user's message"+reqUser.getId());
		
	}

}
