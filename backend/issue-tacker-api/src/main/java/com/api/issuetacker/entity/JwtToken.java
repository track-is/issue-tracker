package com.api.issuetacker.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.*;
import org.springframework.data.annotation.Id;

import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JwtToken {
    @jakarta.persistence.Id
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    private UUID userId;


    private String token;


    private String refreshToken;


    private Boolean rememberMe;


    private String ipAddress;


    private String userAgent;


    private Long tokenTimeToLive;

}
