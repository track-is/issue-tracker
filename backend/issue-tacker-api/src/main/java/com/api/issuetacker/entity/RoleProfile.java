package com.api.issuetacker.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.security.core.GrantedAuthority;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoleProfile extends CustomBaseEntity implements GrantedAuthority {

    private String name;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "roleprofile_authorities",
            joinColumns = { @JoinColumn(name = "roleprofile_id") },
            inverseJoinColumns = { @JoinColumn(name = "roleauthority_id") })
    @Builder.Default
    private List<RoleAuthority> roleAuthorities = new ArrayList<>();

    // Uncomment this
//    @ManyToOne
//    private User user;

//    @OneToMany(mappedBy = "roleProfiles")
//    private List<User> user;

//    @JsonIgnore
//    @OneToMany(fetch = FetchType.EAGER, mappedBy = "roleProfile", cascade = CascadeType.ALL)
//    private List<User> users;

//    @ManyToMany(mappedBy = "roleProfiles")
//    private List<User> users = new ArrayList<>();


    @Override
    public String getAuthority() {
        return name;
    }

}
