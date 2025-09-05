package com.pht.service;

import java.util.List;

import com.pht.entity.ToKhaiThongTin;
import com.pht.exception.BusinessException;
import com.pht.model.request.ToKhaiThongTinRequest;
import com.pht.model.request.UpdateTrangThaiRequest;

public interface ToKhaiThongTinService extends BaseService<ToKhaiThongTin, Long> {
    
    List<ToKhaiThongTin> getAllToKhaiThongTin();
    
    ToKhaiThongTin getToKhaiThongTinById(Long id) throws BusinessException;
    
    ToKhaiThongTin createToKhaiThongTin(ToKhaiThongTinRequest request) throws BusinessException;
    
    ToKhaiThongTin updateTrangThai(UpdateTrangThaiRequest request) throws BusinessException;
    
}
