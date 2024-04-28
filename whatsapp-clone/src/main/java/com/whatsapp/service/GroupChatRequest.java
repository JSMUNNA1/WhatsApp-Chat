package com.whatsapp.service;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class GroupChatRequest {
	  
	 private List<Integer> userIds;
	 private String ChatName;
	 private String ChatImage;

}
