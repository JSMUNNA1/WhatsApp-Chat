package com.whatsapp.service;

import java.util.List;

import com.whatsapp.entity.Message;
import com.whatsapp.entity.User;
import com.whatsapp.exception.ChatException;
import com.whatsapp.exception.MessageException;
import com.whatsapp.exception.UserException;
import com.whatsapp.user.request.SendMessageRequest;

public interface MessageService {
     
	public Message sendMessage(SendMessageRequest req)throws UserException,ChatException;
	public List<Message>getChatsMessages(Integer chatId,User reqUser) throws ChatException,UserException;
	public Message findMessageById(Integer messageId)throws MessageException;
	public void deleteMessage(Integer messageId,User reqUser)throws MessageException,UserException;
	
}
