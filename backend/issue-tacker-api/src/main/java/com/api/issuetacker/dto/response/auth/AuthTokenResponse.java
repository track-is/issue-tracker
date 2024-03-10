package com.api.issuetacker.dto.response.auth;

import com.api.issuetacker.dto.response.AbstractBaseResponse;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
public class AuthTokenResponse extends AbstractBaseResponse {
    @Schema(
            name = "name",
            description = "Name",
            type = "String",
            example = "John Schmidt..."
    )
    private String name;

    @Schema(
        name = "token",
        description = "Token Response",
        type = "TokenResponse",
        example = "{eyJhbGciOiJIUzUxMiJ9...}"
    )
    private TokenResponse tokenResponse;
}
