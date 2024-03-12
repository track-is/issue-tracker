package com.api.issuetacker.controller;

import com.api.issuetacker.entity.User;
import com.api.issuetacker.security.JwtUserDetails;
import com.api.issuetacker.service.MessageSourceService;
import com.api.issuetacker.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @Autowired
    private UserService userService;

    @GetMapping
//    @Secured("DEVELOPER")
//    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<String> dashboard() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("--------------------------------------------------------------");
        JwtUserDetails jwtUser = (JwtUserDetails) auth.getPrincipal();
        auth.getAuthorities().stream().forEach(grantedAuthority -> {
            System.out.println(grantedAuthority.getAuthority());
        });

        User user = userService.findByEmail(jwtUser.getEmail());
        user.getRoleProfile().getRoleAuthorities().forEach(i->{
            System.out.println(i.getName());
        });

        return ResponseEntity.ok(messageSourceService.get(user.getRoleProfile().getName()));
    }
}
