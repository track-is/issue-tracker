package com.api.issuetacker.entity;

import com.api.issuetacker.enums.IssuePriority;
import com.api.issuetacker.enums.IssueStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "issues")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Issue extends CustomBaseEntity {

    private String issueCode;

    private String title;

    private String summary;

    private String description;

    @Enumerated(EnumType.STRING)
    private IssueStatus status;

    @Enumerated(EnumType.STRING)
    private IssuePriority priority;

    @Column(name = "snapshot_url")
    private String snapshotURL;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER )
    @JoinColumn(name="identifiedBy",referencedColumnName = "email", updatable = false)
    private User identifiedBy;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER )
    @JoinColumn(name="assignedTo",referencedColumnName = "email")
    private User assignedTo;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="updatedBy",referencedColumnName = "email")
    private User updatedBy;

    @Column(name="dt_identified_at", updatable = false)
    private LocalDateTime dtIdentifiedAt = LocalDateTime.now();

    @Column(name="dt_updated_at")
    private LocalDateTime dtUpdatedAt = LocalDateTime.now();

    @Column(name = "target_resolution_date")
    private LocalDate targetResolutionDate;

    @Column(name = "actual_resolution_date")
    private LocalDate actualResolutionDate;

    private String resolutionSummary;

    @OneToMany(mappedBy = "issue")
    private List<IssueHistory> issueHistoryList;
}

