package com.api.issuetacker.security;

import com.api.issuetacker.entity.RoleAuthority;
import com.api.issuetacker.entity.User;
import com.api.issuetacker.enums.RoleProfileEnum;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Data
public final class JwtUserDetails implements UserDetails {
    private String id;

    private String email;

    private String username;

    private String password;

    private Collection<? extends GrantedAuthority> authorities;

    /**
     * JwtUserDetails constructor.
     *
     * @param id          String
     * @param email       String
     * @param password    String
     * @param authorities Collection<? extends GrantedAuthority>
     */
    private JwtUserDetails(final String id, final String email, final String password,
                           final Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.email = email;
        this.username = email;
        this.password = password;
        this.authorities = authorities;
    }

    /**
     * Create JwtUserDetails from User.
     *
     * @param user User
     * @return JwtUserDetails
     */
//    public static JwtUserDetails create(final User user) {
//        List<GrantedAuthority> authorities = user.getRoles().stream()
//            .map(role -> new SimpleGrantedAuthority(role.getName().name()))
//            .collect(Collectors.toList());
//
//        return new JwtUserDetails(user.getId().toString(), user.getEmail(), user.getPassword(), authorities);
//    }

    public static JwtUserDetails create(final User user) {
        List<RoleAuthority> authorityList = user.getRoleProfile().getRoleAuthorities();
        List<GrantedAuthority> authorities = authorityList.stream()
                .map(i -> new SimpleGrantedAuthority(i.getName()))
                .collect(Collectors.toList());
//        List<GrantedAuthority> authorities = Arrays.asList(new SimpleGrantedAuthority("ISSUE_READ"));
//        System.out.println("--------------In JwtUserDetails-----------------");
//        authorities.forEach(grantedAuthority -> {
//            System.out.println(grantedAuthority.getAuthority());
//        });
        return new JwtUserDetails(user.getId().toString(), user.getEmail(), user.getPassword(), authorities);
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
