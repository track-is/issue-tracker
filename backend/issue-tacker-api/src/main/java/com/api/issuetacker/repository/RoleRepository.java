package com.api.issuetacker.repository;

import com.api.issuetacker.entity.Role;
import com.api.issuetacker.util.Constants;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, String> {
    Optional<Role> findByName(Constants.RoleEnum name);
}
