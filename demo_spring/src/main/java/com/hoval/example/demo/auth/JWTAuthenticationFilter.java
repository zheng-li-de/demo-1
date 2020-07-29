package com.hoval.example.demo.auth;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hoval.example.demo.controller.ErrorResponse;
import com.hoval.example.demo.service.GeneralException;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

public class JWTAuthenticationFilter extends OncePerRequestFilter {
    
    @Override
    protected void doFilterInternal(final HttpServletRequest request, final HttpServletResponse response, final FilterChain filterChain) throws ServletException,
            IOException {
        try {
            String uri = request.getRequestURI();
            if (uri.startsWith("/api")) {
                Authentication authentication = JWTTokenUtil.getAuthentication(request);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
            filterChain.doFilter(request, response);
        } catch (ExpiredJwtException | UnsupportedJwtException | MalformedJwtException |
                SignatureException | IllegalArgumentException e) {
            ErrorResponse body = new ErrorResponse(new GeneralException(401, "token expired"));
            String message = new ObjectMapper().writeValueAsString(body);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, message);
        }
    }
}