package com.crm.service;

import java.util.List;

import com.crm.entity.ToKhaiThongTin;
import com.crm.exception.BusinessException;
import com.crm.model.request.ToKhaiThongTinRequest;
import com.crm.model.request.UpdateTrangThaiRequest;

public interface ToKhaiThongTinService extends BaseService<ToKhaiThongTin, Long> {
    
    List<ToKhaiThongTin> getAllToKhaiThongTin();
    
    ToKhaiThongTin getToKhaiThongTinById(Long id) throws BusinessException;
    
    ToKhaiThongTin createToKhaiThongTin(ToKhaiThongTinRequest request) throws BusinessException;
    
    ToKhaiThongTin updateTrangThai(UpdateTrangThaiRequest request) throws BusinessException;
    
}
