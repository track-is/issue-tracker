package com.api.issuetacker.service;

import com.api.issuetacker.dto.request.user.CreateUserRequest;
//import com.api.issuetacker.entity.CustomAuthority;
import com.api.issuetacker.entity.Role;
//import com.api.issuetacker.repository.CustomAuthorityRepository;
import com.api.issuetacker.entity.RoleAuthority;
import com.api.issuetacker.entity.RoleProfile;
import com.api.issuetacker.entity.User;
import com.api.issuetacker.repository.RoleAuthorityRepository;
import com.api.issuetacker.repository.RoleProfileRepository;
import com.api.issuetacker.repository.UserRepository;
import com.api.issuetacker.util.Constants;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


//@Service
@RequiredArgsConstructor
@Slf4j
public class DummyDataService implements CommandLineRunner {

//    @Autowired
    RoleAuthorityRepository roleAuthorityRepository;

//    @Autowired
    RoleProfileRepository roleProfileRepository;

    private final RoleService roleService;

    private final UserService userService;

//    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
//        addRoleToUser();
        createRoleProfiles();
//        createRoleAuthorities();
//        createRoles();
//        if (roleService.count() == 0) {
//            log.info("Creating roles...");
//            createRoles();
//            log.info("Roles created.");
//        }
//
//        if (userService.count() == 0) {
//            log.info("Creating users...");
//            createUsers();
//            log.info("Users created.");
//        }
    }

    private void addRoleToUser(){
        Optional<RoleProfile> roleProfile = roleProfileRepository.findByName("DEVELOPER");
        User user = userService.findByEmail("damodarpant@email.com");
        user.setRoleProfile(roleProfile.get());
        userRepository.save(user);
    }

    private void createRoleProfiles(){
        List<RoleProfile> roleProfileList = new ArrayList<>();
        List<RoleAuthority> roleAuthorityList = roleAuthorityRepository.findAll();
        RoleProfile rp =  RoleProfile.builder().name("REPORTING_MANAGER").roleAuthorities(roleAuthorityList).build();
        roleProfileList.add(rp);
        roleProfileRepository.saveAll(roleProfileList);


    }

//    private void createRoleAuthorities(){
//        List<RoleAuthority> customAuthorities = new ArrayList<>();
//        customAuthorities.add(RoleAuthority.builder().name("ISSUE_CREATE").build());
//        customAuthorities.add(RoleAuthority.builder().name("ISSUE_UPDATE").build());
//        customAuthorities.add(RoleAuthority.builder().name("ISSUE_DELETE").build());
//        roleAuthorityRepository.saveAll(customAuthorities);
//    }

    /**
     * Create roles.
     */
    private void createRoles() {
        List<Role> roleList = new ArrayList<>();
//        roleList.add(Role.builder().name(Constants.RoleEnum.ADMIN).build());
//        roleList.add(Role.builder().name(Constants.RoleEnum.USER).build());

        roleList.add(Role.builder().name(Constants.RoleEnum.valueOf("DEVELOPER")).build());
        roleList.stream().forEach(role->{
            System.out.println(role.getName());
        });
        roleService.saveList(roleList);
    }

    /**
     * Create users.
     *
     * @throws BindException Bind exception
     */
    private void createUsers() throws BindException {
        List<String> roleList = new ArrayList<>();
        roleList.add(Constants.RoleEnum.ADMIN.getValue());
        roleList.add(Constants.RoleEnum.USER.getValue());
        String defaultPassword = "P@sswd123.";

        userService.create(CreateUserRequest.builder()
            .email("admin@example.com")
            .password(defaultPassword)
            .name("John")
            .lastName("DOE")
            .roles(roleList)
            .isEmailVerified(true)
            .isBlocked(false)
            .build());

        userService.create(CreateUserRequest.builder()
            .email("user@example.com")
            .password(defaultPassword)
            .name("Jane")
            .lastName("DOE")
            .roles(List.of(roleList.get(1)))
            .isEmailVerified(true)
            .isBlocked(false)
            .build());
    }
}
