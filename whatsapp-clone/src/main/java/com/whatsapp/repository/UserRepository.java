package com.whatsapp.repository;
import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.whatsapp.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
            
	public User findByEmail(String email);
	
	@Query("select u from User u where u.fullName Like %:query% or u.email Like %:query%")
	public List<User>search(@Param("query") String query);
//	public List<User>findByFullName(String query);
}
