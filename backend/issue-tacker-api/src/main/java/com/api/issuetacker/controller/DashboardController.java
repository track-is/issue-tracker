package com.api.issuetacker.controller;

import com.api.issuetacker.entity.User;
import com.api.issuetacker.security.JwtUserDetails;
import com.api.issuetacker.service.MessageSourceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashboardController extends AbstractBaseController {
    private final MessageSourceService messageSourceService;

    @GetMapping
    public ResponseEntity<String> dashboard() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();



        System.out.println("--------------------------------------------------------------");
        JwtUserDetails jwtUser = (JwtUserDetails) auth.getPrincipal();

        return ResponseEntity.ok(messageSourceService.get(jwtUser.getEmail()));
    }
}
