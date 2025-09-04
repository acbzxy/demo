package com.crm.service.impl;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.crm.entity.ToKhaiThongTin;
import com.crm.entity.ToKhaiThongTinChiTiet;
import com.crm.exception.BusinessException;
import com.crm.model.request.ToKhaiThongTinChiTietRequest;
import com.crm.model.request.ToKhaiThongTinRequest;
import com.crm.model.request.UpdateTrangThaiRequest;
import com.crm.repository.ToKhaiThongTinChiTietRepository;
import com.crm.repository.ToKhaiThongTinRepository;
import com.crm.service.ToKhaiThongTinService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ToKhaiThongTinServiceImpl extends BaseServiceImpl<ToKhaiThongTin, Long> implements ToKhaiThongTinService {

    private final ToKhaiThongTinRepository toKhaiThongTinRepository;
    private final ToKhaiThongTinChiTietRepository toKhaiThongTinChiTietRepository;

    @Override
    public ToKhaiThongTinRepository getRepository() {
        return toKhaiThongTinRepository;
    }

    @Override
    public List<ToKhaiThongTin> getAllToKhaiThongTin() {
        return toKhaiThongTinRepository.findAll();
    }

    @Override
    public ToKhaiThongTin getToKhaiThongTinById(Long id) throws BusinessException {
        return toKhaiThongTinRepository.findById(id)
                .orElseThrow(() -> new BusinessException("Không tìm thấy tờ khai thông tin với ID: " + id));
    }

    @Override
    @Transactional
    public ToKhaiThongTin createToKhaiThongTin(ToKhaiThongTinRequest request) throws BusinessException {
        try {
            // Tạo entity chính
            ToKhaiThongTin toKhaiThongTin = new ToKhaiThongTin();
            BeanUtils.copyProperties(request, toKhaiThongTin);
            
            // Lưu entity chính trước
            ToKhaiThongTin savedToKhai = toKhaiThongTinRepository.save(toKhaiThongTin);
            
            // Xử lý chi tiết nếu có
            if (request.getChiTietList() != null && !request.getChiTietList().isEmpty()) {
                for (ToKhaiThongTinChiTietRequest chiTietRequest : request.getChiTietList()) {
                    ToKhaiThongTinChiTiet chiTiet = new ToKhaiThongTinChiTiet();
                    BeanUtils.copyProperties(chiTietRequest, chiTiet);
                    chiTiet.setToKhaiThongTinID(savedToKhai.getId());
                    toKhaiThongTinChiTietRepository.save(chiTiet);
                }
            }
            
            return savedToKhai;
        } catch (Exception e) {
            log.error("Lỗi khi tạo tờ khai thông tin: ", e);
            throw new BusinessException("Lỗi khi tạo tờ khai thông tin: " + e.getMessage());
        }
    }

    @Override
    @Transactional
    public ToKhaiThongTin updateTrangThai(UpdateTrangThaiRequest request) throws BusinessException {
        try {
            ToKhaiThongTin toKhaiThongTin = getToKhaiThongTinById(request.getId());
            toKhaiThongTin.setTrangThai(request.getTrangThai());
            return toKhaiThongTinRepository.save(toKhaiThongTin);
        } catch (Exception e) {
            log.error("Lỗi khi cập nhật trạng thái tờ khai thông tin: ", e);
            throw new BusinessException("Lỗi khi cập nhật trạng thái: " + e.getMessage());
        }
    }
}
