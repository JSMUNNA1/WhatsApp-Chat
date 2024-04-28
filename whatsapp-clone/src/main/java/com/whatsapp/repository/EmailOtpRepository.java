package com.whatsapp.repository;

import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.whatsapp.entity.Email;

@Repository
public interface EmailOtpRepository extends JpaRepository<Email, Integer>{
    
   public Email findByOtp(String otp);
   
}
