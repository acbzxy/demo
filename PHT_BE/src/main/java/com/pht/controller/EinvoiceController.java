package com.pht.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pht.common.helper.ResponseHelper;
import com.pht.model.request.CreateIcrRequest;
import com.pht.service.EinvoiceService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/einvoice")
public class EinvoiceController {

    @Autowired
    private EinvoiceService einvoiceService;

    @PostMapping("/create-icr")
    public ResponseEntity<?> createIcr(@RequestBody CreateIcrRequest request) {
        try {
            log.info("Nhận yêu cầu tạo ICR e-invoice");
            
            String fptResponse = einvoiceService.createIcr(request);
            
            log.info("Trả về response từ FPT API: {}", fptResponse);
            
            return ResponseEntity.ok()
                    .contentType(org.springframework.http.MediaType.APPLICATION_JSON)
                    .body(fptResponse);
                    
        } catch (Exception ex) {
            log.error("Lỗi khi tạo ICR e-invoice: ", ex);
            return ResponseHelper.error(ex);
        }
    }
}

