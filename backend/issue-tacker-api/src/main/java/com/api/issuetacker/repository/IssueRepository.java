package com.api.issuetacker.repository;

import com.api.issuetacker.entity.Issue;
import com.api.issuetacker.enums.IssueStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface IssueRepository extends PagingAndSortingRepository<Issue, Long> {
    List<Issue> findByStatus(IssueStatus status, Sort by);

    Page<Issue> findByStatus(IssueStatus status, PageRequest pageRequest);

    Optional<Issue> findById(UUID id);

    Issue save(Issue issue);
}
