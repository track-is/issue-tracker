package com.api.issuetacker.repository;

import com.api.issuetacker.entity.RoleProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleProfileRepository extends JpaRepository<RoleProfile, String> {
    Optional<RoleProfile> findByName(String name);
}
