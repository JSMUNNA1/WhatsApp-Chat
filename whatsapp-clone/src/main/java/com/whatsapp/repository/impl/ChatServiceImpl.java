package com.whatsapp.repository.impl;

import java.util.List;
import java.util.Optional;
import java.util.function.Supplier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.whatsapp.entity.Chat;
import com.whatsapp.entity.User;
import com.whatsapp.exception.ChatException;
import com.whatsapp.exception.UserException;
import com.whatsapp.repository.ChatRepository;
import com.whatsapp.service.ChatService;
import com.whatsapp.service.GroupChatRequest;
import com.whatsapp.service.UserService;

import jakarta.persistence.Id;

@Service
public class ChatServiceImpl implements ChatService {
         
	   @Autowired
	   private ChatRepository chatRepository;
	   
	   @Autowired
	   private UserService uService;
	@Override
	public Chat createChat(User reqUser, Integer userId2) throws UserException {
        
        User user=uService.findUserById(userId2);
        
        Chat isChatisExist=chatRepository.findSingleChatByUsersId(reqUser, user);
           
         if(isChatisExist!=null) {
        	 return isChatisExist;
         }
          Chat chat=new Chat();
          chat.setCreatedBy(reqUser);
          chat.getUsers().add(user);
          chat.getUsers().add(reqUser);
          chat.setGroup(false);
          
		return chatRepository.save(chat);
	}

	@Override
	public Chat findChatById(Integer chatId) throws ChatException {
		    Optional<Chat>  chat=chatRepository.findById(chatId);
		       if(chat.isPresent()) {
		    	   return chat.get();
		       }
		    	   throw new ChatException("Chat not found with that id "+chatId);
		    	   
		    	  
		    	   
	}

	@Override
	public Chat createGroup(GroupChatRequest req, User reqUser) throws UserException {
		    
		Chat group=new Chat();
		group.setGroup(true);
		group.setChatImage(req.getChatImage());
		group.setChatName(req.getChatName());
	    group.setCreatedBy(reqUser);
	    group.getAdmins().add(reqUser);
	      for(Integer userId:req.getUserIds()) {
	    	   User user=uService.findUserById(userId);
	    			   group.getUsers().add(user);
	      }
		return chatRepository.save(group);
	}

	@Override
	public List<Chat> findAllChatByUserId(Integer userId) throws UserException {
		  User user=uService.findUserById(userId);
		  List<Chat>chats=chatRepository.findChatByUserId(user.getId());
		  
		return chats;
	}

	@Override
	public void deleteChat(Integer chatId, Integer userId) throws ChatException, UserException {
		 Optional<Chat>opt=chatRepository.findById(chatId);
		  
		  if(opt.isPresent()) {
		      Chat chat=opt.get();
		      chatRepository.deleteById(chat.getId());
		  }
            
		
	}

	@Override
	public Chat removeFromGroup(Integer chatId, Integer userId, User reqUser) throws UserException, ChatException {
		
		  Optional<Chat>opt=chatRepository.findById(chatId);
	      User user=uService.findUserById(userId);
	     
	      if(opt.isPresent()) {
	    	    Chat chat=opt.get();
	    	       if(chat.getAdmins().contains(reqUser) ) {
	    	        chat.getUsers().remove(user);
	    	         return chatRepository.save(chat);
	    	       }
	    	       else if(chat.getUsers().contains(reqUser)) {
	    	    	     if(user.getId().equals(reqUser.getId())) {
	    	    	    	 chat.getUsers().remove(user);
	    	    	         return chatRepository.save(chat);
	    	    	     }
	    	       }
	    	       
					throw new UserException("you can't remove another user");
					
				
	      }
	            
			throw new ChatException("chat is not fonded with this id"+chatId);
	}

	@Override
	public Chat renameGroup(Integer chatId, String groupName, User reqUser) throws UserException, ChatException {
		  Optional<Chat>opt=chatRepository.findById(chatId);
		  
		  if(opt.isPresent()) {
			   Chat chat=opt.get();
			   chat.setChatName(groupName);
			   return chatRepository.save(chat);
			   
		  }
		    
		  throw new ChatException("chat is not fonded with this id"+chatId);
	}

	@Override
	public Chat addUserToGroup(Integer userId, Integer chatId,User reqUser) throws UserException, ChatException {
      Optional<Chat>opt=chatRepository.findById(chatId);
      User user=uService.findUserById(userId);
     
      if(opt.isPresent()) {
    	    Chat chat=opt.get();
    	       if(chat.getAdmins().contains(reqUser)) {
    	        chat.getUsers().add(user);
    	         return chatRepository.save(chat);
    	       }
    	       else {
				throw new UserException("you are not admins");
				
			}
      }
            
		throw new ChatException("chat is not fonded with this id"+chatId);
		
	}


	
}
