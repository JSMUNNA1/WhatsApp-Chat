package com.whatsapp.config;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.*;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.function.Function;
public class JwtTokenValidator extends OncePerRequestFilter {
	//private static final SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
	 String secreteString = "843567893696976453275974432697R634976R738467TR678T34865R6834R8763T478378637664538745673865783678548735687R3";
     byte[] keyBytes = Base64.getDecoder().decode(secreteString.getBytes(StandardCharsets.UTF_8));
    private  SecretKey Key = new SecretKeySpec(keyBytes, "HmacSHA256");
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String jwt = request.getHeader("Authorization");
		

		if (jwt != null) {
			
//			 jwt = jwt.substring(7);
			
//			 try {
//		            Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(secretKey.getEncoded()).build().parseClaimsJws(jwt);
//		            String username = claims.getBody().getSubject();
//		           
//		        } catch (Exception e) {
//		            // Token validation failed
//		              System.out.print("Exception"+e.getMessage());
//		        }
			
			
			
			

			try {
				
				 
//				System.out.println("Token from clients"+jwt);
			  
//			    System.out.println("Token from clients after="+jwt);
//			    SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());
//			    System.out.println(" after key working="+jwt);
//			    Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
			    ///check wia youtube
			    // Bearer Token
				  jwt = jwt.substring(7);
			    Claims claims = Jwts.parser().verifyWith(Key).build().parseSignedClaims(jwt).getPayload();
			    System.out.println("After claims Work after="+jwt);
			    String userName = String.valueOf(claims.get("email"));
//			       System.out.println("Emali="+userName);
			    String authorities = String.valueOf(claims.get("authorities"));
			    List<GrantedAuthority> authorityList = AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);
			    Authentication authentication = new UsernamePasswordAuthenticationToken(userName, null, authorityList);
			    SecurityContextHolder.getContext().setAuthentication(authentication);
			} catch (Exception e) {
			    // Log the error and handle it appropriately
			    logger.error("Error processing JWT token: " + e.getMessage(), e);
			    // Optionally, throw an exception or return an error response to the client
			    // throw new BadCredentialsException("Invalid token received");
			    // Or return an error response to the client
			    // response.setStatus(HttpStatus.UNAUTHORIZED.value());
			    // response.getWriter().write("Invalid token received");
			}


		}
		filterChain.doFilter(request, response);

	}

}
