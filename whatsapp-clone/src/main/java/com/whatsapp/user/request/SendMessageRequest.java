package com.whatsapp.user.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor

public class SendMessageRequest {
	
	private Integer userId;
	private Integer chatId;
	private String  content; 

}
