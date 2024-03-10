package com.api.issuetacker.enums;

public enum RoleProfile {
    DEVELOPER,
    DESIGNER,
    TECH_ANALYST,
    QA_TESTER,
    SECURITY_ENGINEER,
    PROJECT_MANAGER,
    PRODUCT_MANAGER,
    REPORTING_MANAGER;

    static public boolean isMember(String roleProfile) {
        RoleProfile[] roleProfiles = RoleProfile.values();
        for (RoleProfile profile : roleProfiles)
            if (profile.name().equals(roleProfile))
                return true;
        return false;
    }
}
