package com.api.issuetacker.service;

import com.api.issuetacker.entity.Role;
import com.api.issuetacker.entity.RoleProfile;
import com.api.issuetacker.entity.User;
import com.api.issuetacker.exception.NotFoundException;
import com.api.issuetacker.repository.RoleProfileRepository;
import com.api.issuetacker.repository.RoleRepository;
import com.api.issuetacker.repository.UserRepository;
import com.api.issuetacker.util.Constants;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoleProfilePService {
    private final RoleProfileRepository roleProfileRepository;

    private final MessageSourceService messageSourceService;


    @Autowired
    private UserRepository userRepository;


    /**
     * Find by roleProfile name.
     *
     * @param name Constants.RoleProfile Enum
     * @return RoleProfile
     */
    public RoleProfile findByName(String name) {
        return roleProfileRepository.findByName(name)
            .orElseThrow(() -> new NotFoundException(messageSourceService.get("roleprofile_not_found")));
    }

    /**
     * Create roleProfile.
     *
     * @param roleProfile RoleProfile
     * @return RoleProfile
     */
    public RoleProfile create(final RoleProfile roleProfile) {
        return roleProfileRepository.save(roleProfile);
    }

    /**
     * Save list role_profiles.
     *
     * @param roleProfileList List
     * @return List
     */
    public List<RoleProfile> saveList(List<RoleProfile> roleProfileList) {
        return roleProfileRepository.saveAll(roleProfileList);
    }

    public void addRoleProfileToUser(String email){
        Optional<RoleProfile> roleProfile = roleProfileRepository.findByName("DEVELOPER");
        User user = userRepository.findByEmail(email).get();
//        user.setRoleProfile(roleProfile.get());
        userRepository.save(user);
    }
}
