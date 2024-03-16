package com.api.issuetacker.enums;

public enum IssueStatus {
    APPROVED,
    OPEN,
    FIXED,
    PENDING_RETEST,
    RETESTING,
    RE_OPEN,
    VERIFIED,
    CLOSED,
    REJECTED,
    IN_PROGRESS;

    static public boolean isMember(String statusName) {
        IssueStatus[] issueStatusList = IssueStatus.values();
        for (IssueStatus issueStatus : issueStatusList)
            if (issueStatus.name().equals(statusName))
                return true;
        return false;
    }
}
