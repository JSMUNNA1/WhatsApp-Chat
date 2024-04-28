package com.whatsapp.repository.impl;

import java.time.LocalDateTime;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.whatsapp.entity.Email;
import com.whatsapp.entity.User;
import com.whatsapp.repository.EmailOtpRepository;
import com.whatsapp.repository.UserRepository;
import com.whatsapp.user.request.UserEmailRegister;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailServiceImpl {
       
	   @Autowired
	   JavaMailSender javaMailSender;
	   @Autowired            
	   UserRepository userRepository;
	   
	   @Autowired
	   EmailOtpRepository emailOtpRepository;
	   
	   
	      
	  public void sendEmail(String to) {
		    Random random=new Random();
		    String otp=String.format("%06d", random.nextInt(100000));
		    String subject="Email Verification From JSMGROUP ";
		    String body="your Verification Otp is:"+otp;
		    
		   
		     try {
		    	  MimeMessage message=javaMailSender.createMimeMessage();
				MimeMessageHelper helper=new MimeMessageHelper(message,true);
			      helper.setTo(to);
			      helper.setSubject(subject);
			      helper.setText(body);
			      javaMailSender.send(message);
			      
			     Email email=new Email();
			      email.setEmail(to);
			      email.setOtp(otp);
			      email.setExpirationTime(LocalDateTime.now().plusMinutes(2));
			      emailOtpRepository.save(email);
			     
		     } catch (MessagingException e) {
					e.printStackTrace();
			}
	  }
	  
	  public UserEmailRegister checkOtp(String otp) {
		    Email email=emailOtpRepository.findByOtp(otp);
		    
		    if(email==null) {
		         return new UserEmailRegister("Otp is Invalid",false);
		    }else {
		    	String email1=email.getEmail();
		    	UserEmailRegister emailRegister=new UserEmailRegister(email1,true);
		    	      
		         User user=new User();
		         user.setEmail(email1);
		          userRepository.save(user);
		          emailOtpRepository.deleteAll();
		        return emailRegister;
		    }
		    
	  }
	   
}
