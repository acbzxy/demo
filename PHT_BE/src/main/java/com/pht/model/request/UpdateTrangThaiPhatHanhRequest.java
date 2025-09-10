package com.pht.model.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;

@Data
@Schema(description = "Request cập nhật trạng thái phát hành")
public class UpdateTrangThaiPhatHanhRequest {

    @NotNull(message = "ID tờ khai không được để trống")
    @Schema(description = "ID của tờ khai thông tin", example = "123", required = true)
    private Long id;

    @NotBlank(message = "Trạng thái phát hành không được để trống")
    @Schema(description = "Trạng thái phát hành mới", example = "01", required = true)
    private String trangThaiPhatHanh;
}

