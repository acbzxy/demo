package com.crm.common.model.request;

import com.crm.common.OrderBy;
import com.crm.common.PageInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@NoArgsConstructor
@AllArgsConstructor
public class QueryRequest<T> {

    private T sample;
    private PageInfo pageInfo;
    private List<OrderBy> orders;
}
