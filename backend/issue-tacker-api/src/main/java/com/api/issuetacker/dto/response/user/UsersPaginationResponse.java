package com.api.issuetacker.dto.response.user;

import com.api.issuetacker.dto.response.PaginationResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public class UsersPaginationResponse extends PaginationResponse<UserResponse> {
    public UsersPaginationResponse(final Page<?> pageModel, final List<UserResponse> items) {
        super(pageModel, items);
    }
}
