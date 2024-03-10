package com.api.issuetacker.service;

import com.api.issuetacker.dto.response.PaginationResponse;
import com.api.issuetacker.entity.Issue;
import com.api.issuetacker.enums.IssueStatus;
import com.api.issuetacker.repository.IssueRepository;
import com.api.issuetacker.util.StringHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class IssueService {
    private final IssueRepository issueRepo;

    public PaginationResponse<Issue> getAll(Map<String, String> searchQuery) {
        String[] statuses = {"title","status","createdAt"};
        List<String> orderByList =  new ArrayList<>(Arrays.asList(statuses));
        String orderBy = !StringHelper.empty(searchQuery.get("orderBy"))   ? searchQuery.get("orderBy") : "id";
        if(!orderByList.contains(searchQuery.get("orderBy"))) orderBy = "id";

        String status = searchQuery.get("status");
        if(!IssueStatus.isMember(status)) status = null;

        int pageNo = StringHelper.empty(searchQuery.get("pageNo")) || Integer.parseInt(searchQuery.get("pageNo")) == 0 ? 0: Integer.parseInt( searchQuery.get("pageNo")) - 1;
        int pageSize = StringHelper.empty(searchQuery.get("pageSize")) ? 10:Integer.parseInt( searchQuery.get("pageSize"));


        if (StringHelper.empty(status)) {
//            return (List<Issue>) issueRepo.findAll(
//                    Sort.by(orderBy.equals("createdAt") ? Sort.Direction.DESC : Sort.Direction.ASC, orderBy));
            Page<Issue>  issuePage = getIssuesByPagination2(pageNo, pageSize, Sort.by( orderBy));
            return new PaginationResponse<>(issuePage, issuePage.getContent());
        }

        IssueStatus issueStatus = IssueStatus.valueOf(status);

        Page<Issue>  issuePage = getIssuesWithStatusByPagination2(issueStatus, pageNo, pageSize,Sort.by(orderBy) );
        return new PaginationResponse<>(issuePage, issuePage.getContent());

//        return issueRepo.findByStatus(issueStatus, Sort.by(orderBy.equals("createdAt")?Sort.Direction.DESC: Sort.Direction.ASC, orderBy));
    }

    public Issue getOne(Long id) throws Exception {
        Optional<Issue> issue = issueRepo.findById(id);
        if (issue.isPresent()) {
            return issue.get();
        }
        throw new Exception("No matching record found");
    }

    public Issue create(Issue issue) throws Exception {
        try {
            return issueRepo.save(issue);
        } catch (Exception e) {
            throw new Exception("Something went wrong");
        }
    }

    public Issue update(Long id, Issue issue) throws Exception {
        try {
            Issue prevIssue = issueRepo.findById(id).orElse(null);
            if (prevIssue == null) throw new Exception("No matching record found");
            if (issue.getTitle() != null) prevIssue.setTitle(issue.getTitle());
            if (issue.getStatus() != null) prevIssue.setStatus(issue.getStatus());
            if (issue.getDescription() != null) prevIssue.setDescription(issue.getDescription());
            return issueRepo.save(prevIssue);
        } catch (Exception e) {
            throw new Exception("Something went wrong");
        }
    }


    public List<Issue> getIssuesByPagination(int pageNo, int pageSize, Sort sortBy) {

        //create pagerequest object
        PageRequest pageRequest = PageRequest.of(pageNo, pageSize, sortBy.ascending());
        //pass it to repos
        Page<Issue> pagingIssues = issueRepo.findAll(pageRequest);
        //pagingUser.hasContent(); -- to check pages are there or not


//        Sort nameSort = Sort.by("name");
//        Sort emailSort = Sort.by("email");
//
//        Sort multiSort = emailSort.and(nameSort);

//        List<User> result = userRepository.findAll(multiSort);

        //Slice<User> result = userRepository.findByEmail("abcd@gmail.com", paging);
        return pagingIssues.getContent();
    }
    public List<Issue> getIssuesWithStatusByPagination(IssueStatus issueStatus, int pageNo, int pageSize, Sort sortBy) {

        //create pagerequest object
        PageRequest pageRequest = PageRequest.of(pageNo, pageSize, sortBy.ascending());
        //pass it to repos
        Page<Issue> pagingIssues = issueRepo.findByStatus(issueStatus,pageRequest);
        //pagingUser.hasContent(); -- to check pages are there or not


//        Sort nameSort = Sort.by("name");
//        Sort emailSort = Sort.by("email");
//
//        Sort multiSort = emailSort.and(nameSort);

//        List<User> result = userRepository.findAll(multiSort);

        //Slice<User> result = userRepository.findByEmail("abcd@gmail.com", paging);
        return pagingIssues.getContent();
    }

    public Page<Issue>  getIssuesByPagination2(int pageNo, int pageSize, Sort sortBy) {

        //create pagerequest object
        PageRequest pageRequest = PageRequest.of(pageNo, pageSize, sortBy.ascending());
        //pass it to repos
        Page<Issue> pagingIssues = issueRepo.findAll(pageRequest);
        //pagingUser.hasContent(); -- to check pages are there or not


//        Sort nameSort = Sort.by("name");
//        Sort emailSort = Sort.by("email");
//
//        Sort multiSort = emailSort.and(nameSort);

//        List<User> result = userRepository.findAll(multiSort);

        //Slice<User> result = userRepository.findByEmail("abcd@gmail.com", paging);
        return pagingIssues;
    }
    public Page<Issue>  getIssuesWithStatusByPagination2(IssueStatus issueStatus, int pageNo, int pageSize, Sort sortBy) {

        //create pagerequest object
        PageRequest pageRequest = PageRequest.of(pageNo, pageSize, sortBy.ascending());
        //pass it to repos
        Page<Issue> pagingIssues = issueRepo.findByStatus(issueStatus,pageRequest);
        //pagingUser.hasContent(); -- to check pages are there or not


//        Sort nameSort = Sort.by("name");
//        Sort emailSort = Sort.by("email");
//
//        Sort multiSort = emailSort.and(nameSort);

//        List<User> result = userRepository.findAll(multiSort);

        //Slice<User> result = userRepository.findByEmail("abcd@gmail.com", paging);
        return pagingIssues;
    }
}
