package com.api.issuetacker.controller;

import com.api.issuetacker.dto.request.issue.CreateIssueRequest;
import com.api.issuetacker.dto.response.PaginationResponse;
import com.api.issuetacker.entity.Issue;
import com.api.issuetacker.enums.IssueStatus;
import com.api.issuetacker.service.ImageService;
import com.api.issuetacker.service.IssueService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @GetMapping
    public ResponseEntity<PaginationResponse> getAllIssues(@RequestParam Map<String,String> searchQuery) {

        return ResponseEntity.ok(issueService.getAll(searchQuery));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Issue> getIssue(@PathVariable String id) throws Exception {
        return ResponseEntity.ok(issueService.getOne(Long.parseLong(id)));
    }

    @PostMapping
    public ResponseEntity<Issue> createIssue(@RequestBody Issue issue) throws Exception {
        issue.setStatus(IssueStatus.OPEN);
        return ResponseEntity.ok(issueService.create(issue));
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
        System.out.println(request.getStatus() + " "+request.getTitle());
        String uploadDirectory = "src/main/resources/static/images/issues";
        String adsImagesString =
                imageService.saveImageToStorage(uploadDirectory, request.getImage());

        // Save the adsImagesString in your database
        // You can also associate it with other data in your Ads object
        return ResponseEntity.ok(adsImagesString);
    }
}
