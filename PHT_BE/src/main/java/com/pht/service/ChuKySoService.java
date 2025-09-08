package com.pht.service;

import java.util.List;

import com.pht.model.request.KySoRequest;
import com.pht.model.response.ChuKySoResponse;
import com.pht.model.response.KySoResponse;

public interface ChuKySoService {
    
    /**
     * Lấy danh sách chữ ký số có sẵn
     */
    List<ChuKySoResponse> layDanhSachChuKySo();
    
    /**
     * Thực hiện ký số tờ khai
     */
    KySoResponse kySo(KySoRequest request) throws com.pht.exception.BusinessException;
}

