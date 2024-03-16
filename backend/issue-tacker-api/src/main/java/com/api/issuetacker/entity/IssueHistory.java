package com.api.issuetacker.entity;

import com.api.issuetacker.enums.IssueStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
class IssueHistory extends CustomBaseEntity{
    @Enumerated(EnumType.STRING)
    private IssueStatus status;

    @Column(name="dt_created_at")
    private LocalDateTime dtCreatedAt;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "issue_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Issue issue;
}