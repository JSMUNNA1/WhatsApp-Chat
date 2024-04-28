package com.whatsapp.repository.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.whatsapp.config.TokenProvider;
import com.whatsapp.entity.User;
import com.whatsapp.exception.UserException;
import com.whatsapp.repository.UserRepository;
import com.whatsapp.service.UserService;
import com.whatsapp.user.request.UpdateUserName;
import com.whatsapp.user.request.UpdateUserRequest;
import com.whatsapp.user.request.UserEmailRegister;

@Service
public class UserServiceImpl implements UserService {
	
	private UserRepository uRepository;
	  @Autowired
	private TokenProvider tProvider;
	
	
	   //construction
	
	public UserServiceImpl(UserRepository uRepository, TokenProvider tProvider) {
		super();
		this.uRepository = uRepository;
		this.tProvider = tProvider;
	}
              //otpSystem
	         public User register(User  reqUser) {
	        	   User user=uRepository.findByEmail(reqUser.getEmail());
	        	   user.setFullName(reqUser.getFullName());
	        	   user.setPassword(reqUser.getPassword());
	        	   
	        	   return uRepository.save(user);
	         }
	
	@Override
	public User findUserById(Integer id) throws UserException {
	Optional<User> opt  =	uRepository.findById(id);
	   if(opt.isPresent()) {
		   return opt.get(); 
	   }
		throw new UserException("User Not Found with id"+id);
	}

	@Override
	public User findUserProfile(String jwt) throws UserException {
		String email=tProvider.getEmailFromToken(jwt);
		 if(email==null) {
			throw new BadCredentialsException("receving invalid token--"); 
		 }
		 User user=uRepository.findByEmail(email);
		 if(user==null) {
			 throw new UserException("User Not Found With email"+email);
		 }
		    
		return user;
	}

	@Override
	public User updateUser(Integer userId, UpdateUserRequest req) throws UserException {
		   User user=findUserById(userId);
		  if(req.getFullName()!=null) {
			  user.setFullName(req.getFullName());
		  }
		  if(req.getProfilePicture()!=null) {
			  user.setProfilePicture(req.getProfilePicture());
		  }
		 
		return uRepository.save(user);
	}

	@Override
	public List<User> searchUser(String query) {
		List<User> users=uRepository.search(query);
		return users;
	}

	@Override
	public User updateUserName(Integer userId, UpdateUserName req) throws UserException {
		  User user=findUserById(userId);
		  if(req.getUserName()!=null) {
			     user.setFullName(req.getUserName()); 
		  }
		return  uRepository.save(user);
	}

}
