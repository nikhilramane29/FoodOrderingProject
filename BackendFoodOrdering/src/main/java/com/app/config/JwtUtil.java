package com.app.config;

import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Service
public class JwtUtil {

	private String secret;
	private int jwtExpirationInMs;
	private int refreshExpirationDateInMs;
	
	@Value("${jwt.secret}")
	public void setSecret(String secret) {
		this.secret = secret;
	}
	
	@Value("${jwt.jwtExpirationInMs}")
	public void setJwtExpirationInMs(int jwtExpirationInMs) {
		this.jwtExpirationInMs = jwtExpirationInMs;
	}
	
	@Value("${jwt.refreshExpirationDateInMs}")
	public void setRefreshExpirationDateInMs(int refreshExpirationDateInMs) {
		this.refreshExpirationDateInMs = refreshExpirationDateInMs;
	}
	
	public String generateToken(UserDetails userDetails) {
		Map<String, Object> claims = new HashMap<>();
		Collection<? extends GrantedAuthority> roles = userDetails.getAuthorities();
		
		if(roles.contains(new SimpleGrantedAuthority("ROLE_ADMIN"))) {
			claims.put("isAdmin", true);
		}
		if(roles.contains(new SimpleGrantedAuthority("ROLE_USER"))) {
			claims.put("isUser", true);
		}
		if(roles.contains(new SimpleGrantedAuthority("ROLE_VENDOR"))) {
			claims.put("isVendor", true);
		}
		
		return doGenerateToken(claims, userDetails.getUsername());
	}

	private String doGenerateToken(Map<String, Object> claims, String subject) {
		return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + jwtExpirationInMs)).signWith(SignatureAlgorithm.HS512, secret).compact();
	}
	
	public String doGenerateRefreshToken(Map<String, Object> claims, String subject) {

		return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + refreshExpirationDateInMs))
				.signWith(SignatureAlgorithm.HS512, secret).compact();

	}
	
	@SuppressWarnings("unused")
	public boolean validateToken(String authToken) {
		try {
			// Jwt token has not been tampered with
			Jws<Claims> claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(authToken);
			
		} catch (SignatureException | MalformedJwtException | UnsupportedJwtException | IllegalArgumentException ex) {
			throw new BadCredentialsException("Invalid Credentials, please login again!", ex);
		} catch (ExpiredJwtException ex) {
			throw ex;
		}
		return true;
	}
	
	public String getEmailFromToken(String token) {
		Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();

		return claims.getSubject();
	}

	public List<SimpleGrantedAuthority> getRolesFromToken(String authToken) {
		List<SimpleGrantedAuthority> roles = null;
		Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(authToken).getBody();
		Boolean isAdmin = claims.get("isAdmin", Boolean.class);
		Boolean isUser = claims.get("isUser", Boolean.class);
		Boolean isVendor = claims.get("isVendor", Boolean.class);
		
		if (isAdmin != null && isAdmin == true) {
			roles = Arrays.asList(new SimpleGrantedAuthority("ROLE_ADMIN"));
		}
		if (isUser != null && isUser == true) {
			roles = Arrays.asList(new SimpleGrantedAuthority("ROLE_USER"));
		}
		if (isVendor != null && isVendor == true) {
			roles = Arrays.asList(new SimpleGrantedAuthority("ROLE_VENDOR"));
		}
		
		return roles;
	}
	
	public String getRoleForResponse (String token) {
		String role;
		Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
		Boolean isAdmin = claims.get("isAdmin", Boolean.class);
		Boolean isUser = claims.get("isUser", Boolean.class);
		if (isAdmin != null && isAdmin == true) {
			role = "admin";
			
		} else if(isUser != null && isUser == true) {
			role = "user";
		}
		else {
			role = "vendor";
		}
		return role;
	}
	
	
}
