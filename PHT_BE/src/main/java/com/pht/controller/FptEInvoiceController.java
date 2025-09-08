package com.pht.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.Base64Utils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pht.common.OrderBy;
import com.pht.common.helper.ResponseHelper;
import com.pht.common.model.ApiDataResponse;
import com.pht.exception.BusinessException;
import com.pht.model.request.CancelInvoiceRequest;
import com.pht.model.request.CreateIcrRequest;
import com.pht.model.request.DeleteInvoiceRequest;
import com.pht.model.request.ReplaceInvoiceRequest;
import com.pht.model.request.SearchInvoiceRequest;
import com.pht.model.response.CancelInvoiceResponse;
import com.pht.model.response.DeleteInvoiceResponse;
import com.pht.model.response.ReplaceInvoiceResponse;
import com.pht.model.response.SearchInvoiceResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/fpt-einvoice")
@Tag(name = "FPT eInvoice", description = "API tích hợp với FPT eInvoice")
public class FptEInvoiceController {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    @Value("${fpt.einvoice.api.url:https://api-uat.einvoice.fpt.com.vn}")
    private String einvoiceApiUrl;

    @Value("${fpt.einvoice.api.delete.url:/delete-icr}")
    private String deleteUrl;

    @Value("${fpt.einvoice.api.cancel.url:/cancel-icr}")
    private String cancelUrl;

    @Value("${fpt.einvoice.api.replace.url:/replace-icr}")
    private String replaceUrl;

    @Value("${fpt.einvoice.api.search.url:/search-icr}")
    private String searchUrl;

    @Value("${fpt.einvoice.api.create.url:/create-icr}")
    private String createUrl;

    @Value("${fpt.einvoice.api.update.url:/update-icr}")
    private String updateUrl;

    @Value("${fpt.einvoice.api.username:}")
    private String apiUsername;

    @Value("${fpt.einvoice.api.password:}")
    private String apiPassword;

    @Operation(summary = "Xóa hóa đơn chưa phát hành")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Xóa hóa đơn thành công", content = {
                    @Content(schema = @Schema(implementation = ApiDataResponse.class), mediaType = "application/json")
            }),
            @ApiResponse(responseCode = "400", description = "Dữ liệu request không hợp lệ", content = {
                    @Content(schema = @Schema(implementation = OrderBy.ApiErrorResponse.class), mediaType = "application/json")
            }),
            @ApiResponse(responseCode = "500", description = "Lỗi hệ thống", content = {
                    @Content(schema = @Schema(implementation = OrderBy.ApiErrorResponse.class), mediaType = "application/json")
            })
    })
    @PostMapping("/delete-icr")
    public ResponseEntity<?> deleteInvoice(@RequestBody DeleteInvoiceRequest request) {
        try {
            log.info("Nhận yêu cầu xóa hóa đơn - INC: {}, Username: {}", 
                    request.getRefInv().getInc(), request.getUser().getUsername());
            
            DeleteInvoiceResponse response = callDeleteInvoiceApi(request);
            
            log.info("Xóa hóa đơn hoàn thành - INC: {}, ErrorCode: {}", 
                    request.getRefInv().getInc(), response.getErrorCode());
            
            return ResponseHelper.ok(response);
            
        } catch (Exception ex) {
            log.error("Lỗi khi xóa hóa đơn - INC: {}", 
                    request.getRefInv() != null ? request.getRefInv().getInc() : "unknown", ex);
            return ResponseHelper.error(ex);
        }
    }

    @Operation(summary = "Hủy hóa đơn")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Hủy hóa đơn thành công", content = {
                    @Content(schema = @Schema(implementation = ApiDataResponse.class), mediaType = "application/json")
            }),
            @ApiResponse(responseCode = "400", description = "Dữ liệu request không hợp lệ", content = {
                    @Content(schema = @Schema(implementation = OrderBy.ApiErrorResponse.class), mediaType = "application/json")
            }),
            @ApiResponse(responseCode = "500", description = "Lỗi hệ thống", content = {
                    @Content(schema = @Schema(implementation = OrderBy.ApiErrorResponse.class), mediaType = "application/json")
            })
    })
    @PostMapping("/cancel-icr")
    public ResponseEntity<?> cancelInvoice(@RequestBody CancelInvoiceRequest request) {
        try {
            log.info("Nhận yêu cầu hủy hóa đơn - Username: {}, STAX: {}, Số items: {}", 
                    request.getUser().getUsername(), 
                    request.getWrongnotice().getStax(),
                    request.getWrongnotice().getItems().size());
            
            CancelInvoiceResponse response = callCancelInvoiceApi(request);
            
            log.info("Hủy hóa đơn hoàn thành - ErrorCode: {}", response.getErrorCode());
            
            return ResponseHelper.ok(response);
            
        } catch (Exception ex) {
            log.error("Lỗi khi hủy hóa đơn - Username: {}", 
                    request.getUser() != null ? request.getUser().getUsername() : "unknown", ex);
            return ResponseHelper.error(ex);
        }
    }

    @Operation(summary = "Thay thế hóa đơn")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Thay thế hóa đơn thành công", content = {
                    @Content(schema = @Schema(implementation = ApiDataResponse.class), mediaType = "application/json")
            }),
            @ApiResponse(responseCode = "400", description = "Dữ liệu request không hợp lệ", content = {
                    @Content(schema = @Schema(implementation = OrderBy.ApiErrorResponse.class), mediaType = "application/json")
            }),
            @ApiResponse(responseCode = "500", description = "Lỗi hệ thống", content = {
                    @Content(schema = @Schema(implementation = OrderBy.ApiErrorResponse.class), mediaType = "application/json")
            })
    })
    @PostMapping("/replace-icr")
    public ResponseEntity<?> replaceInvoice(@RequestBody ReplaceInvoiceRequest request) {
        try {
            log.info("Nhận yêu cầu thay thế hóa đơn - Username: {}, STAX: {}, Số items: {}", 
                    request.getUser().getUsername(), 
                    request.getInv().getStax(),
                    request.getInv().getItems().size());
            
            ReplaceInvoiceResponse response = callReplaceInvoiceApi(request);
            
            log.info("Thay thế hóa đơn hoàn thành - ErrorCode: {}", response.getErrorCode());
            
            return ResponseHelper.ok(response);
            
        } catch (Exception ex) {
            log.error("Lỗi khi thay thế hóa đơn - Username: {}", 
                    request.getUser() != null ? request.getUser().getUsername() : "unknown", ex);
            return ResponseHelper.error(ex);
        }
    }

    @Operation(summary = "Tìm kiếm hóa đơn")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Tìm kiếm hóa đơn thành công", content = {
                    @Content(schema = @Schema(implementation = ApiDataResponse.class), mediaType = "application/json")
            }),
            @ApiResponse(responseCode = "400", description = "Dữ liệu request không hợp lệ", content = {
                    @Content(schema = @Schema(implementation = OrderBy.ApiErrorResponse.class), mediaType = "application/json")
            }),
            @ApiResponse(responseCode = "500", description = "Lỗi hệ thống", content = {
                    @Content(schema = @Schema(implementation = OrderBy.ApiErrorResponse.class), mediaType = "application/json")
            })
    })
    @PostMapping("/search-icr")
    public ResponseEntity<?> searchInvoice(@RequestBody SearchInvoiceRequest request) {
        try {
            log.info("Nhận yêu cầu tìm kiếm hóa đơn - STAX: {}, Type: {}, SID: {}, Username: {}", 
                    request.getStax(), request.getType(), request.getSid(), request.getUser().getUsername());
            
            String response = callSearchInvoiceApi(request);
            
            log.info("Tìm kiếm hóa đơn hoàn thành - Response: {}", response);
            
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(response);
            
        } catch (Exception ex) {
            log.error("Lỗi khi tìm kiếm hóa đơn - STAX: {}", 
                    request.getStax() != null ? request.getStax() : "unknown", ex);
            return ResponseHelper.error(ex);
        }
    }


    @Operation(summary = "Tạo ICR e-invoice")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Tạo ICR thành công", content = {
                    @Content(schema = @Schema(implementation = ApiDataResponse.class), mediaType = "application/json")
            }),
            @ApiResponse(responseCode = "400", description = "Dữ liệu request không hợp lệ", content = {
                    @Content(schema = @Schema(implementation = OrderBy.ApiErrorResponse.class), mediaType = "application/json")
            }),
            @ApiResponse(responseCode = "500", description = "Lỗi hệ thống", content = {
                    @Content(schema = @Schema(implementation = OrderBy.ApiErrorResponse.class), mediaType = "application/json")
            })
    })
    @PostMapping("/create-icr")
    public ResponseEntity<?> createIcr(@RequestBody CreateIcrRequest request) {
        try {
            log.info("Nhận yêu cầu tạo ICR e-invoice");
            
            String fptResponse = callCreateIcrApi(request);
            
            log.info("Tạo ICR hoàn thành - Response: {}", fptResponse);
            
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(fptResponse);
                    
        } catch (Exception ex) {
            log.error("Lỗi khi tạo ICR e-invoice: ", ex);
            return ResponseHelper.error(ex);
        }
    }

    @Operation(summary = "Cập nhật ICR e-invoice")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Cập nhật ICR thành công", content = {
                    @Content(schema = @Schema(implementation = ApiDataResponse.class), mediaType = "application/json")
            }),
            @ApiResponse(responseCode = "400", description = "Dữ liệu request không hợp lệ", content = {
                    @Content(schema = @Schema(implementation = OrderBy.ApiErrorResponse.class), mediaType = "application/json")
            }),
            @ApiResponse(responseCode = "500", description = "Lỗi hệ thống", content = {
                    @Content(schema = @Schema(implementation = OrderBy.ApiErrorResponse.class), mediaType = "application/json")
            })
    })
    @PostMapping("/update-icr")
    public ResponseEntity<?> updateIcr(@RequestBody CreateIcrRequest request) {
        try {
            log.info("Nhận yêu cầu cập nhật ICR e-invoice");
            
            String fptResponse = callUpdateIcrApi(request);
            
            log.info("Cập nhật ICR hoàn thành - Response: {}", fptResponse);
            
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(fptResponse);
                    
        } catch (Exception ex) {
            log.error("Lỗi khi cập nhật ICR e-invoice: ", ex);
            return ResponseHelper.error(ex);
        }
    }

    // Private methods for API calls
    private HttpHeaders createBasicAuthHeaders() {
        return createBasicAuthHeaders(apiUsername, apiPassword);
    }
    
    private HttpHeaders createBasicAuthHeaders(String username, String password) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Accept", "application/json");
        
        String authUsername = username != null ? username : apiUsername;
        String authPassword = password != null ? password : apiPassword;
        
        if (authUsername != null && !authUsername.isEmpty() && authPassword != null && !authPassword.isEmpty()) {
            String auth = authUsername + ":" + authPassword;
            String encodedAuth = Base64Utils.encodeToString(auth.getBytes());
            headers.set("Authorization", "Basic " + encodedAuth);
            log.info("Sử dụng Basic Authentication với username: {}", authUsername);
        }
        
        return headers;
    }

    private DeleteInvoiceResponse callDeleteInvoiceApi(DeleteInvoiceRequest request) throws BusinessException {
        try {
            HttpHeaders headers = createBasicAuthHeaders();

            String requestBody = objectMapper.writeValueAsString(request);
            HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

            String url = einvoiceApiUrl + deleteUrl;
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

            return objectMapper.readValue(response.getBody(), DeleteInvoiceResponse.class);
        } catch (Exception e) {
            throw new BusinessException("Lỗi khi gọi API xóa hóa đơn: " + e.getMessage());
        }
    }

    private CancelInvoiceResponse callCancelInvoiceApi(CancelInvoiceRequest request) throws BusinessException {
        try {
            HttpHeaders headers = createBasicAuthHeaders();

            String requestBody = objectMapper.writeValueAsString(request);
            HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

            String url = einvoiceApiUrl + cancelUrl;
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

            return objectMapper.readValue(response.getBody(), CancelInvoiceResponse.class);
        } catch (Exception e) {
            throw new BusinessException("Lỗi khi gọi API hủy hóa đơn: " + e.getMessage());
        }
    }

    private ReplaceInvoiceResponse callReplaceInvoiceApi(ReplaceInvoiceRequest request) throws BusinessException {
        try {
            HttpHeaders headers = createBasicAuthHeaders();

            String requestBody = objectMapper.writeValueAsString(request);
            HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

            String url = einvoiceApiUrl + replaceUrl;
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

            return objectMapper.readValue(response.getBody(), ReplaceInvoiceResponse.class);
        } catch (Exception e) {
            throw new BusinessException("Lỗi khi gọi API thay thế hóa đơn: " + e.getMessage());
        }
    }

    private String callSearchInvoiceApi(SearchInvoiceRequest request) throws BusinessException {
        try {
            HttpHeaders headers = createBasicAuthHeaders(request.getUser().getUsername(), request.getUser().getPassword());
            
            // Không cần request body, chỉ cần Basic Auth
            HttpEntity<String> entity = new HttpEntity<>(headers);

            String url = UriComponentsBuilder.fromHttpUrl(einvoiceApiUrl + searchUrl)
                    .queryParam("stax", request.getStax())
                    .queryParam("type", request.getType())
                    .queryParam("sid", request.getSid())
                    .toUriString();

            log.info("Gọi FPT API Search: {}", url);
            
            // Thử GET method trước (vì search thường dùng GET)
            ResponseEntity<String> response;
            try {
                response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
                log.info("Thành công với GET method");
            } catch (Exception getException) {
                log.warn("GET method thất bại, thử POST method: {}", getException.getMessage());
                response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
                log.info("Thành công với POST method");
            }

            return response.getBody();
        } catch (Exception e) {
            throw new BusinessException("Lỗi khi gọi API tìm kiếm hóa đơn: " + e.getMessage());
        }
    }


    private String callCreateIcrApi(CreateIcrRequest request) throws BusinessException {
        try {
            HttpHeaders headers = createBasicAuthHeaders();

            String requestBody = objectMapper.writeValueAsString(request);
            HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

            String url = einvoiceApiUrl + createUrl;
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

            return response.getBody();
        } catch (Exception e) {
            throw new BusinessException("Lỗi khi gọi API tạo ICR: " + e.getMessage());
        }
    }

    private String callUpdateIcrApi(CreateIcrRequest request) throws BusinessException {
        try {
            HttpHeaders headers = createBasicAuthHeaders();

            String requestBody = objectMapper.writeValueAsString(request);
            HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

            String url = einvoiceApiUrl + updateUrl;
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

            return response.getBody();
        } catch (Exception e) {
            throw new BusinessException("Lỗi khi gọi API cập nhật ICR: " + e.getMessage());
        }
    }
}
