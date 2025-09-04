package com.crm.service;

import java.util.List;

import com.crm.model.request.KySoRequest;
import com.crm.model.response.ChuKySoResponse;
import com.crm.model.response.KySoResponse;

public interface ChuKySoService {
    
    /**
     * Lấy danh sách chữ ký số có sẵn
     */
    List<ChuKySoResponse> layDanhSachChuKySo();
    
    /**
     * Thực hiện ký số tờ khai
     */
    KySoResponse kySo(KySoRequest request) throws com.crm.exception.BusinessException;
}
