package com.whatsapp.service;

import com.whatsapp.entity.User;
import com.whatsapp.exception.UserException;
import com.whatsapp.user.request.UpdateUserName;
import com.whatsapp.user.request.UpdateUserRequest;

import java.util.*;


public interface UserService {
      
	public User findUserById(Integer id) throws UserException;
	public User findUserProfile(String jwt) throws UserException;
	public User updateUser(Integer userId, UpdateUserRequest req)throws UserException;
	public List<User> searchUser(String query);
	public User updateUserName(Integer userId,UpdateUserName req) throws UserException;
	 public User register(User  reqUser);
	

	
}
