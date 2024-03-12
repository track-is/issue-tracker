package com.api.issuetacker.repository;

import com.api.issuetacker.entity.RoleAuthority;
import com.api.issuetacker.util.Constants;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleAuthorityRepository extends JpaRepository<RoleAuthority, String> {
    Optional<RoleAuthority> findByName(String name);
}
