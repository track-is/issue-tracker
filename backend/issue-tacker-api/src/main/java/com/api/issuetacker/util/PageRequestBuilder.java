package com.api.issuetacker.util;

import com.api.issuetacker.entity.specification.criteria.PaginationCriteria;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Slf4j
public class PageRequestBuilder extends AbstractBaseSortDirection {
    public static PageRequest build(final PaginationCriteria paginationCriteria) throws BadRequestException {
        if (paginationCriteria.getPage() == null || paginationCriteria.getPage() < 1) {
            log.warn("Page number is not valid");
            throw new BadRequestException("Page must be greater than 0!");
        }

        paginationCriteria.setPage(paginationCriteria.getPage() - 1);

        if (paginationCriteria.getSize() == null || paginationCriteria.getSize() < 1) {
            log.warn("Page size is not valid");
            throw new BadRequestException("Size must be greater than 0!");
        }

        PageRequest pageRequest = PageRequest.of(paginationCriteria.getPage(), paginationCriteria.getSize());

        if (paginationCriteria.getSortBy() != null && paginationCriteria.getSort() != null) {
            Sort.Direction direction = getDirection(paginationCriteria.getSort());

            List<String> columnsList = new ArrayList<>(Arrays.asList(paginationCriteria.getColumns()));
            if (columnsList.contains(paginationCriteria.getSortBy())) {
                return pageRequest.withSort(Sort.by(direction, paginationCriteria.getSortBy()));
            }
        }

        return pageRequest;
    }

    public static class BadRequestException extends Throwable {
        public BadRequestException(String s) {
        }
    }
}
