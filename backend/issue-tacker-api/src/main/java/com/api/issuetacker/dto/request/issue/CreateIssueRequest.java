package com.api.issuetacker.dto.request.issue;

import com.api.issuetacker.dto.annotation.Password;
import com.api.issuetacker.dto.annotation.ValueOfEnum;
import com.api.issuetacker.enums.IssueStatus;
import com.api.issuetacker.util.Constants;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateIssueRequest {
    @NotBlank(message = "{not_blank}")
    @Schema(
        name = "title",
        description = "Title of issue",
        type = "String",
        requiredMode = Schema.RequiredMode.REQUIRED,
        example = "UI test case failed"
    )
    private String title;

    @NotBlank(message = "{not_blank}")
    @Schema(
            name = "description",
            description = "Description of issue",
            type = "String",
            requiredMode = Schema.RequiredMode.REQUIRED,
            example = "Description of issue"
    )
    private String description;

    @NotBlank(message = "{not_blank}")
    @Schema(
            name = "status",
            description = "Status of issue",
            type = "String",
            requiredMode = Schema.RequiredMode.REQUIRED,
            example = "OPEN",
            defaultValue = "NEW"
    )
    private @ValueOfEnum(enumClass = IssueStatus.class) String status;

    @Schema(
            name = "snapshot",
            description = "Snapshot of issue",
            type = "MultipartFile",
            requiredMode = Schema.RequiredMode.NOT_REQUIRED,
            example = "file.jpg"
    )
    private MultipartFile image;
}
