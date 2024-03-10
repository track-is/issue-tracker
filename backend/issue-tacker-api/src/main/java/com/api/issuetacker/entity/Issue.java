package com.api.issuetacker.entity;

import com.api.issuetacker.enums.IssuePriority;
import com.api.issuetacker.enums.IssueStatus;
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

    private String title;

    @Enumerated(EnumType.STRING)
    private IssueStatus status;

    private String description;

    @Enumerated(EnumType.STRING)
    private IssuePriority priority;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="identifiedBy",referencedColumnName = "email", updatable = false)
    private User identifiedBy;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="updatedBy",referencedColumnName = "email")
    private User updatedBy;


    @Column(name="created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name="updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

}
