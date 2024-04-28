package com.whatsapp.entity;

import java.time.LocalDateTime;

import jakarta.annotation.Generated;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Email {
	
	 @Id
	 @GeneratedValue(strategy = GenerationType.AUTO)
	private   Integer id;
	private   String email;
	private   String otp;
	private LocalDateTime expirationTime;
	  
 
}
