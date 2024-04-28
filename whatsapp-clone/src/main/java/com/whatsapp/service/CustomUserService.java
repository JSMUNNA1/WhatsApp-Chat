package com.whatsapp.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.whatsapp.entity.User;
import com.whatsapp.repository.UserRepository;

@Service
public class CustomUserService implements UserDetailsService{
    
	  private UserRepository userRepository;
	  public CustomUserService(UserRepository userRepository) {
		    this.userRepository=userRepository;
	  }
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		   System.out.println(email);
		  User user=userRepository.findByEmail(email);
		   
		  if(user==null) {
			  throw new UsernameNotFoundException("User not found with Email:"+email);
		  }
		  List<GrantedAuthority>authorities=new ArrayList<>();
		  
		return new  org.springframework.security.core.userdetails.User(user.getEmail(),user.getPassword(),authorities);
	}

}
