package com.api.issuetacker.entity;
import jakarta.persistence.*;
import lombok.*;


import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoleAuthority extends CustomBaseEntity {
    private String name;

    @ManyToMany(mappedBy = "roleAuthorities")
    private List<RoleProfile> roleProfiles = new ArrayList<>();
}
