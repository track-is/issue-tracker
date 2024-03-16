package com.api.issuetacker.service;

import com.api.issuetacker.dto.request.issue.CreateIssueRequest;
import com.api.issuetacker.dto.response.IssueResponse;
import com.api.issuetacker.dto.response.PaginationResponse;
import com.api.issuetacker.entity.Issue;
import com.api.issuetacker.entity.User;
import com.api.issuetacker.enums.IssuePriority;
import com.api.issuetacker.enums.IssueStatus;
import com.api.issuetacker.exception.BadRequestException;
import com.api.issuetacker.exception.NotFoundException;
import com.api.issuetacker.repository.IssueRepository;
import com.api.issuetacker.security.JwtUserDetails;
import com.api.issuetacker.util.RandomIdGenerator;
import com.api.issuetacker.util.StringHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class IssueService {
    private final IssueRepository issueRepo;

    @Autowired
    FirebaseService firebaseService;

    @Autowired
    UserService userService;
    @Autowired
    AuthenticationService authService;

    public PaginationResponse<IssueResponse> getAll(Map<String, String> searchQuery) {
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
            List<IssueResponse> issueList = issuePage.getContent().stream().map(IssueResponse::convert).toList();
            return new PaginationResponse<>(issuePage, issueList);
        }

        IssueStatus issueStatus = IssueStatus.valueOf(status);

        Page<Issue>  issuePage = getIssuesWithStatusByPagination2(issueStatus, pageNo, pageSize,Sort.by(orderBy) );
        List<IssueResponse> issueList = issuePage.getContent().stream().map(IssueResponse::convert).toList();
        return new PaginationResponse<>(issuePage, issueList);

//        return issueRepo.findByStatus(issueStatus, Sort.by(orderBy.equals("createdAt")?Sort.Direction.DESC: Sort.Direction.ASC, orderBy));
    }

    @Transactional
    public IssueResponse getOne(String id) throws Exception {
        Optional<Issue> issue = issueRepo.findById(UUID.fromString(id));
        if (issue.isPresent()) {
            return IssueResponse.convert(issue.get());
        }
        throw new NotFoundException("No matching record found");
    }

    public Issue create(CreateIssueRequest issueRequest) throws Exception {
        try {
            JwtUserDetails jwtUserDetails = authService.getPrincipal();
            User issueReporter = userService.findByEmail(jwtUserDetails.getEmail());
            String imageURL = firebaseService.upload(issueRequest.getImage());
            Issue issue = Issue.builder()
                    .issueCode(RandomIdGenerator.GetBase36(8))
                    .title(issueRequest.getTitle())
                    .description(issueRequest.getDescription())
                    .summary(issueRequest.getSummary())
                    .status(IssueStatus.OPEN)
                    .priority(IssuePriority.LOW)
                    .snapshotURL(imageURL)
                    .identifiedBy(issueReporter)

                    .build();
            return issueRepo.save(issue);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new BadRequestException("Error creating Issue");
        }
    }

    public Issue update(String id, Issue issue) throws Exception {
        try {
            Issue prevIssue = issueRepo.findById(UUID.fromString(id)).orElse(null);
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
