package com.api.issuetacker.dto.response;

import com.api.issuetacker.dto.annotation.ValueOfEnum;
import com.api.issuetacker.dto.response.user.UserResponse;
import com.api.issuetacker.entity.Issue;
import com.api.issuetacker.enums.IssuePriority;
import com.api.issuetacker.enums.IssueStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Getter
@Setter
@SuperBuilder
public class IssueResponse {
    @Schema(
            name = "id",
            description = "Long",
            type = "String",
            example = "10"
    )
    private Long id;

    @Schema(
            name = "title",
            description = "Title of issue",
            type = "String",
            example = "UI test case failed"
    )
    private String title;

    @Schema(
            name = "description",
            description = "Description of issue",
            type = "String",
            example = "Description of issue"
    )
    private String description;

    @Schema(
            name = "Issue Code",
            description = "Issue code (unique)",
            type = "String",
            example = "UIK785K"
    )
    private String issueCode;

    @Schema(
            name = "status",
            description = "Status of issue",
            type = "String",
            example = "OPEN",
            defaultValue = "NEW"
    )
    private @ValueOfEnum(enumClass = IssueStatus.class) String status;

    @Schema(
            name = "priority",
            description = "Priority of issue",
            type = "String",
            example = "LOW",
            defaultValue = "HIGH"
    )
    private @ValueOfEnum(enumClass = IssuePriority.class) String priority;

    @Schema(
            name = "snapshotURL",
            description = "Snapshot URL of issue",
            type = "String",
            example = "file.jpg"
    )
    private String snapshotURL;

    @Schema(
            name = "identifiedBy",
            description = "User who identified issue",
            type = "User",
            example = "Some User"
    )
    private UserResponse identifiedBy;

    @Schema(
            name = "createdAt",
            type = "LocalDateTime",
            description = "Date time field of issue created",
            example = "2022-09-29T22:37:31"
    )
    private LocalDateTime createdAt;

    @Schema(
            name = "updatedAt",
            type = "LocalDateTime",
            description = "Date time field of issue updated",
            example = "2022-09-29T22:37:31"
    )
    private LocalDateTime updatedAt;

    /**
     * Convert Issue to IssueResponse
     *
     * @param issue Issue
     * @return IssueResponse
     */
    public static IssueResponse convert(Issue issue) {
        return IssueResponse.builder()
                .id(issue.getId())
                .title(issue.getTitle())
                .issueCode(issue.getIssueCode())
                .description(issue.getDescription())
                .status(String.valueOf(issue.getStatus()))
                .priority(String.valueOf(issue.getPriority()))
                .snapshotURL(issue.getSnapshotURL())
                .identifiedBy(issue.getIdentifiedBy() != null ? UserResponse.convertMinimal(issue.getIdentifiedBy()) : UserResponse.builder().build())
                .createdAt(issue.getCreatedAt())
                .build();
    }
}
