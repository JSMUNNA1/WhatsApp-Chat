package com.whatsapp.config;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.whatsapp.entity.Email;
import com.whatsapp.repository.EmailOtpRepository;

@Component
public class OtpCleanup {
	
	
	@Autowired
	private EmailOtpRepository emailOtpRepository;
	
	 @Scheduled(fixedDelay = 300000)
	public void cleanupOtp() {
		
		  LocalDateTime localDateTime=LocalDateTime.now();
		List<Email> emails=  emailOtpRepository.findAll();
		  
		 for( Email email: emails) {
			   
			 if(email.getExpirationTime()!=null && email.getExpirationTime().isBefore(localDateTime)) {
				 emailOtpRepository.deleteAll();
				 break;
			 }else {
				 
			 }
		 }
		    
	}

}
