package com.pht.service;

import com.pht.model.request.CreateIcrRequest;

public interface EinvoiceService {
    /**
     * Tạo ICR e-invoice
     * @param request Dữ liệu yêu cầu tạo ICR
     * @return Response dạng JSON string từ FPT API
     */
    String createIcr(CreateIcrRequest request);
}

