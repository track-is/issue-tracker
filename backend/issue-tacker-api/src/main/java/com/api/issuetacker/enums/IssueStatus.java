package com.api.issuetacker.enums;

public enum IssueStatus {
    OPEN,
    CLOSED,
    IN_PROGRESS;

    static public boolean isMember(String statusName) {
        IssueStatus[] issueStatusList = IssueStatus.values();
        for (IssueStatus issueStatus : issueStatusList)
            if (issueStatus.name().equals(statusName))
                return true;
        return false;
    }
}
