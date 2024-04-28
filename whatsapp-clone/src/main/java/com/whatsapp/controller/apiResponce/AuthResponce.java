package com.whatsapp.controller.apiResponce;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@Setter
@Getter
@ToString
@NoArgsConstructor
public class AuthResponce {
       
	private String  jwt;
	private boolean isAuth;
	
}
