package com.whatsapp.config;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class TokenProvider {
	
//	SecretKey key=Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());
//	   private static final SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
//	   // Expiration time of the token in milliseconds (1 hour in this example)
//	    private static final long expirationTimeMillis = 3600000;
	 String secreteString = "843567893696976453275974432697R634976R738467TR678T34865R6834R8763T478378637664538745673865783678548735687R3";
     byte[] keyBytes = Base64.getDecoder().decode(secreteString.getBytes(StandardCharsets.UTF_8));
     private  SecretKey Key = new SecretKeySpec(keyBytes, "HmacSHA256");
     private  static  final long EXPIRATION_TIME = 86400000; 
       public  String generateToken(Authentication authentication) {
    	   
    	      System.out.println(authentication.getName());
    	        //from backend
    	   return Jwts.builder()
                   .subject(authentication.getName()).claim("email", authentication.getName())
                   .issuedAt(new Date(System.currentTimeMillis()))
                   .expiration(new  Date(System.currentTimeMillis() + EXPIRATION_TIME))
                   .signWith(Key)
                   .compact();
    	
//           //generate token via youtube
//    	     String tokenString=Jwts
//    	    		            .builder().setSubject(authentication.getName())
//    	    		            .setIssuedAt(new Date(System.currentTimeMillis()))
//    	    		            .setExpiration(new Date(System.currentTimeMillis()+24*60*60*100))
//    	    		            .signWith(key).compact();
//    	        return tokenString;
//    	   
          
    	    // Method to generate JWT token
    	   
//    	        Date now = new Date();
//    	        Date expiration = new Date(now.getTime() + expirationTimeMillis);
//
//    	        return Jwts.builder()
//    	                .claim("email", authentication.getName())
//    	                .setIssuedAt(now)
//    	                .setExpiration(expiration)
//    	                .signWith(key)
//    	                .compact();
////    	   
//    	        String jwt=Jwts.builder().setIssuer("Code With Zosh")
//    	        		.setIssuedAt(new Date()).setExpiration(new Date(new Date().getTime()+8640000))
//    	        		.claim("email", authentication.getName())
//    	        		.signWith(key)
//    	        		.compact();
//                          
//    	        return jwt;
       }
       public String getEmailFromToken(String jwt) {
    	    jwt=jwt.substring(7);
    	     System.out.println(jwt);
    	     
    	    Claims claims=Jwts.parser().verifyWith(Key).build().parseSignedClaims(jwt).getPayload();
    	            System.out.println(claims.getSubject());
    	            System.out.println(String.valueOf(claims.getSubject()));
    	            System.out.println(claims.get("email"));
    	            System.out.println(String.valueOf(claims.get("email")));
    	            
    	    String email=String.valueOf(claims.get("email"));
    	    return email;
    	
			 
       }
}
