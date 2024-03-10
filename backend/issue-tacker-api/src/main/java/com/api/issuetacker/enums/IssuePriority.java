package com.api.issuetacker.enums;

public enum IssuePriority {
    LOW,
    MEDIUM,
    HIGH;

    static public boolean isMember(String priority) {
        IssuePriority[] issuePriorities = IssuePriority.values();
        for (IssuePriority issuePriority : issuePriorities)
            if (issuePriority.name().equals(priority))
                return true;
        return false;
    }
}
