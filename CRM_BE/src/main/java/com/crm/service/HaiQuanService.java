package com.crm.service;

import com.crm.model.request.LayThongTinHaiQuanRequest;
import com.crm.model.request.ParseHaiQuanDataRequest;
import com.crm.model.response.HaiQuanXmlResponse;
import com.crm.model.response.ThongTinHaiQuanResponse;

public interface HaiQuanService {
    
    ThongTinHaiQuanResponse layThongTinHaiQuan(LayThongTinHaiQuanRequest request);
    
    ThongTinHaiQuanResponse parseHaiQuanResponse(ParseHaiQuanDataRequest request);
    
    HaiQuanXmlResponse getHaiQuanXmlResponse(LayThongTinHaiQuanRequest request);
    
}
