package com.whatsapp.entity;

import org.hibernate.annotations.ManyToAny;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Chat {
    
	 @Id
	 @GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private String chatName;
	private String chatImage;
	
	
	@ManyToMany
	private Set<User> admins=new HashSet<>();
	   
	@Column(name = "is_group")
	private boolean isGroup;
	
	
	@JoinColumn(name = "created_by")
    @ManyToOne
	private User createdBy;
	
	@ManyToMany
	private Set<User> users=new HashSet<>();
	
	
	@OneToMany
	private List<Message> messages=new ArrayList<>();
	
}
