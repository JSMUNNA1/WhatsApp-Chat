package com.whatsapp.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Message {
     
	  @Id 
	 @GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	  
	private String content;
	
	private LocalDateTime timeStamp;
	
	@ManyToOne
	private User user;
	
	@ManyToOne
	@JoinColumn(name = "chatId")
	private Chat chat;
	
	
}
