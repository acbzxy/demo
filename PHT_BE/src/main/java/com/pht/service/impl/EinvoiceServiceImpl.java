package com.pht.service.impl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pht.model.request.CreateIcrRequest;
import com.pht.service.EinvoiceService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class EinvoiceServiceImpl implements EinvoiceService {

    @Value("${einvoice.api.url:https://api-uat.einvoice.fpt.com.vn}")
    private String apiUrl;
    
    @Value("${einvoice.api.create-icr:/create-icr}")
    private String createIcrEndpoint;
    
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    
    public EinvoiceServiceImpl() {
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }

    @Override
    public String createIcr(CreateIcrRequest request) {
        try {
            log.info("Bắt đầu tạo ICR e-invoice");
            
            String fullUrl = apiUrl + createIcrEndpoint;
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            String requestBody = objectMapper.writeValueAsString(request);
            HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);
            
            log.info("Gọi FPT API: {}", fullUrl);
            
            ResponseEntity<String> response = restTemplate.exchange(
                fullUrl,
                HttpMethod.POST,
                entity,
                String.class
            );
            
            log.info("Nhận response từ external API: {}", response.getStatusCode());
            
            String fptResponse = response.getBody();
            log.info("Response từ FPT API: {}", fptResponse);
            
            return fptResponse;
            
        } catch (Exception ex) {
            log.error("Lỗi khi tạo ICR e-invoice: ", ex);
            return "{\"success\":false,\"errorCode\":\"500\",\"message\":\"Lỗi khi tạo ICR e-invoice: " + ex.getMessage() + "\",\"data\":null}";
        }
    }
}

