package com.api.issuetacker.controller;

import com.api.issuetacker.dto.request.issue.CreateIssueRequest;
import com.api.issuetacker.dto.response.IssueResponse;
import com.api.issuetacker.dto.response.PaginationResponse;
import com.api.issuetacker.entity.Issue;
import com.api.issuetacker.enums.IssueStatus;
import com.api.issuetacker.service.FirebaseService;
import com.api.issuetacker.service.ImageService;
import com.api.issuetacker.service.IssueService;
import com.api.issuetacker.util.RandomIdGenerator;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;



@RestController
@RequestMapping("/issues")
@RequiredArgsConstructor
public class IssueController extends AbstractBaseController {

    @Autowired
    private final IssueService issueService;


    @Autowired
    private ImageService imageService;

    @Autowired
    FirebaseService firebaseService;

    @GetMapping
    public ResponseEntity<PaginationResponse> getAllIssues(@RequestParam Map<String,String> searchQuery) {
//        String code = RandomStringUtils.random(8, "ABCDEFGHIJKLMNOPQRSTUVWSXYZ0123456789");
//        System.out.println(code);
        System.out.println(RandomIdGenerator.GetBase36(8));

        return ResponseEntity.ok(issueService.getAll(searchQuery));
    }

    @GetMapping("/{id}")
    public ResponseEntity<IssueResponse> getIssue(@PathVariable String id) throws Exception {
        return ResponseEntity.ok(issueService.getOne(Long.parseLong(id)));
    }

    @PostMapping
    public ResponseEntity<IssueResponse> createIssue(@ModelAttribute CreateIssueRequest issueRequest) throws Exception {
        return ResponseEntity.ok(IssueResponse.convert(issueService.create(issueRequest)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Issue> updateIssue(@PathVariable String id, @RequestBody Issue issue) throws Exception {
        return ResponseEntity.ok(issueService.update(Long.parseLong(id),issue));
    }

    @GetMapping("/paginate")
    public List<Issue> getIssuesWithPaging(@RequestParam(defaultValue = "0") Integer pageNo,
                                        @RequestParam(defaultValue = "10") Integer pageSize){

        return issueService.getIssuesByPagination(pageNo,pageSize, Sort.by("title"));

    }

    @PostMapping("/image-upload")
    public ResponseEntity<?> uploadImage(

            @ModelAttribute CreateIssueRequest request
            // Add other parameters
    ) throws IOException {
//        String imageURL =firebaseService.upload(request.getImage());
        System.out.println(request.getTitle() + " "+request.getDescription() + " "+request.getImage().getOriginalFilename());
        return ResponseEntity.ok("imageURL");
    }
}
