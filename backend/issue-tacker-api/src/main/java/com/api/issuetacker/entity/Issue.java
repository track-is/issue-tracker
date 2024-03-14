package com.api.issuetacker.entity;

import com.api.issuetacker.enums.IssuePriority;
import com.api.issuetacker.enums.IssueStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "issues")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Issue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String issueCode;

    private String title;

    @Enumerated(EnumType.STRING)
    private IssueStatus status;

    private String description;

    @Column(name = "snapshot_url")
    private String snapshotURL;

    @Enumerated(EnumType.STRING)
    private IssuePriority priority;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER )
    @JoinColumn(name="identifiedBy",referencedColumnName = "email", updatable = false)
    private User identifiedBy;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="updatedBy",referencedColumnName = "email")
    private User updatedBy;


    @Column(name="created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name="updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

}
