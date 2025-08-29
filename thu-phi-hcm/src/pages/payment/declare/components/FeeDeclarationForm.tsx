export default function FeeDeclarationForm() {
  return (
    <div className="  min-h-screen">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <div className="grid grid-cols-2 gap-4">
            {/* DOANH NGHIỆP KHAI PHÍ */}
            <div>
              <h3 className="font-bold mb-2">DOANH NGHIỆP KHAI PHÍ</h3>
              <div className="bg-white p-2">
                <div className="mb-2">
                  <label className="block text-sm  mb-1">
                    Mã doanh nghiệp *
                  </label>
                  <input
                    className="w-full border px-2 py-1"
                    defaultValue="0109844160"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm   mb-1">
                    Tên doanh nghiệp *
                  </label>
                  <input
                    className="w-full border px-2 py-1"
                    defaultValue="CÔNG TY TNHH THƯƠNG MẠI VÀ DỊCH VỤ SPV"
                  />
                </div>
                <div>
                  <label className="block text-sm   mb-1">Địa chỉ *</label>
                  <input
                    className="w-full border px-2 py-1"
                    defaultValue="44 đường Lê Quang Đạo, Phường Từ Liêm, TP Hà Nội, Việt Nam"
                  />
                </div>
              </div>
            </div>
            {/* DOANH NGHIỆP XUẤT NHẬP KHẨU */}
            <div>
              <h3 className="font-bold mb-2">DOANH NGHIỆP XUẤT NHẬP KHẨU</h3>
              <div className="bg-white p-2">
                <div className="mb-2">
                  <label className="block text-sm   mb-1">
                    Mã doanh nghiệp *
                  </label>
                  <input
                    className="w-full border px-2 py-1"
                    defaultValue="0109844160"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm   mb-1">
                    Tên doanh nghiệp *
                  </label>
                  <input
                    className="w-full border px-2 py-1"
                    defaultValue="CÔNG TY TNHH THƯƠNG MẠI VÀ DỊCH VỤ SPV"
                  />
                </div>
                <div>
                  <label className="block text-sm   mb-1">Địa chỉ *</label>
                  <input
                    className="w-full border px-2 py-1"
                    defaultValue="44 đường Lê Quang Đạo, Phường Từ Liêm, TP Hà Nội, Việt Nam"
                  />
                </div>
              </div>
            </div>
            {/* TỜ KHAI PHÍ */}
            <div>
              <h3 className="font-bold mb-2">TỜ KHAI HẢI QUAN</h3>
              <div className="bg-white p-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm ">Số tờ khai *</label>
                    <input className="w-full border px-2 py-1 mb-1" />
                  </div>
                  <div>
                    <label className="block text-sm ">Ngày tờ khai *</label>
                    <input type="date" className="w-full border px-2 py-1 " />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm ">Mã Hải quan</label>
                    <select className="w-full border px-2 py-1">
                      <option>-- Chọn --</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm ">Mã loại hình</label>
                    <select className="w-full border px-2 py-1">
                      <option>-- Chọn --</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm ">
                      Mã lưu kho/ Dịch vụ
                    </label>
                    <select className="w-full border px-2 py-1">
                      <option>-- Chọn --</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm ">Nước xuất khẩu</label>
                    <select className="w-full border px-2 py-1">
                      <option>-- Chọn --</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-2">TỜ KHAI PHÍ</h3>
              <div className="bg-white p-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm   mb-1">
                      Số tiếp nhận khai phí
                    </label>
                    <input
                      className="w-full border px-2 py-1"
                      placeholder="..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm  mb-1">
                      Ngày khai phí (tự động)
                    </label>
                    <input
                      type="date"
                      className="w-full border px-2 py-1 h-[33px]"
                      defaultValue="2025-08-27"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm ">Nhóm loại phí</label>
                    <select className="w-full border px-2 py-1">
                      <option>-- Chọn --</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm  mb-1">
                      Loại thanh toán
                    </label>
                    <select className="w-full border px-2 py-1">
                      <option>Chuyển khoản ngân hàng</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm  mb-1">Ghi chú</label>
                    <textarea
                      className="w-full border px-2 py-1"
                      rows={3}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 ">
          <div className="">
            <h3 className="font-bold mb-2">THÔNG TIN THU PHÍ</h3>
            <div className="bg-white p-2">
              {[
                "Số thông báo nộp phí",
                "Tổng tiền phí (VND) - Tạm tính",
                "Trạng thái ngân hàng",
                "Số biên lai",
                "Ngày biên lai",
                "Kí hiệu biên lai",
                "Mẫu biên lai",
                "Mã tra cứu biên lai",
                "Xem biên lai",
              ].map((label, idx) => (
                <div className="mb-2" key={idx}>
                  <label className="block text-sm ">{label}</label>
                  <input
                    className="w-full border px-2 py-1"
                    placeholder="..."
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="font-bold mb-2 mt-4 uppercase">
          Thông tin hàng hóa tờ khai
        </h3>
        <div className="bg-white p-2">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="col-span-2">
                <label className="block text-sm ">
                  Mã hiệu phương thức vận chuyển
                </label>
                <select className="w-full border px-2 py-1  h-[35px]">
                  <option>-- Chọn --</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm ">Phương tiện vận chuyển</label>
                <select className="w-full border px-2 py-1  h-[35px]">
                  <option>-- Chọn --</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm ">Mã địa điểm xếp hàng</label>
                <select className="w-full border px-2 py-1  h-[35px]">
                  <option>-- Chọn --</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm ">Mã địa điểm dỡ hàng</label>
                <select className="w-full border px-2 py-1  h-[35px]">
                  <option>-- Chọn --</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm ">Mã phân loại hàng hóa</label>
                <select
                  className="w-full border px-2 py-1 bg-[#eee] h-[35px]"
                  disabled
                >
                  <option>-- Chọn --</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm ">Mục đích vận chuyển</label>
                <select
                  className="w-full border px-2 py-1 bg-[#eee] h-[35px]"
                  disabled
                >
                  <option>-- Chọn --</option>
                </select>
              </div>
            </div>
            <div className="bg-[#ebf6ff] rounded-xl p-2">
              <div className="flex justify-center mb-2 text-center font-semibold uppercase text-[16px]">
                Danh mục các loại hình hàng hóa đề xuất miễn, giảm phí <br />
                theo quy định từ ngày 01/08/2022
              </div>
              <label className="flex items-center gap-2 mb-1 uppercase GXN01">
                <input
                  type="radio"
                  name="MIEN_GIAM_MA"
                  className="appearance-none w-4 h-4 border border-gray-400 rounded-none
      checked:after:content-['✓'] checked:after:text-green-600 
      checked:after:flex checked:after:items-center checked:after:justify-center 
      checked:after:w-full checked:after:h-full bg-white"
                  value="GXN01"
                />
                <span className="lbl">
                  Hàng hóa vận chuyển bằng đường thủy nội địa - <b>GXN01</b>
                </span>
              </label>
              <label className="flex items-center gap-2 mb-1 uppercase MHQC">
                <input
                  type="radio"
                  name="MIEN_GIAM_MA"
                  className="appearance-none w-4 h-4 border border-gray-400 rounded-none
      checked:after:content-['✓'] checked:after:text-green-600 
      checked:after:flex checked:after:items-center checked:after:justify-center 
      checked:after:w-full checked:after:h-full bg-white"
                  value="MHQC"
                />
                <span className="lbl">
                  Hàng quá cảnh, hàng chuyển khẩu vận chuyển bằng phương tiện
                  thủy nội địa qua Campuchia - <b>MHQC</b>
                </span>
              </label>
              <label className="flex items-center gap-2 mb-1 uppercase MKNQ">
                <input
                  type="radio"
                  name="MIEN_GIAM_MA"
                  className="appearance-none w-4 h-4 border border-gray-400 rounded-none
      checked:after:content-['✓'] checked:after:text-green-600 
      checked:after:flex checked:after:items-center checked:after:justify-center 
      checked:after:w-full checked:after:h-full bg-white"
                  value="MKNQ"
                />
                <span className="lbl">
                  Hàng gửi kho ngoại quan vận chuyển bằng phương tiện thủy nội
                  địa qua Campuchia - <b>MKNQ</b>
                </span>
              </label>
              <label className="flex items-center gap-2 mb-1 uppercase MTNTX">
                <input
                  type="radio"
                  name="MIEN_GIAM_MA"
                  className="appearance-none w-4 h-4 border border-gray-400 rounded-none
      checked:after:content-['✓'] checked:after:text-green-600 
      checked:after:flex checked:after:items-center checked:after:justify-center 
      checked:after:w-full checked:after:h-full bg-white"
                  value="MTNTX"
                />
                <span className="lbl">
                  Hàng tạm nhập tái xuất vận chuyển bằng phương tiện thủy nội
                  địa qua Campuchia - <b>MTNTX</b>
                </span>
              </label>
              <label className="flex items-center gap-2 mb-1 uppercase MXN01">
                <input
                  type="radio"
                  name="MIEN_GIAM_MA"
                  className="appearance-none w-4 h-4 border border-gray-400 rounded-none
      checked:after:content-['✓'] checked:after:text-green-600 
      checked:after:flex checked:after:items-center checked:after:justify-center 
      checked:after:w-full checked:after:h-full bg-white"
                  value="MXN01"
                />
                <span className="lbl">
                  Hàng xuất nhập khẩu vận chuyển bằng phương tiện thủy nội địa
                  qua Campuchia- <b>MXN01</b>
                </span>
              </label>
              <hr className="border-t border-[#bbb]" />
              <label className="flex items-center gap-2 mt-2  uppercase MXN01">
                <span className="bg-orange-400 flex items-center px-2 py-1">
                  <input
                    type="radio"
                    name="MIEN_GIAM_MA"
                    className="appearance-none w-4 h-4 border border-gray-400 rounded-none
        checked:after:content-['✓'] checked:after:text-green-600 
        checked:after:flex checked:after:items-center checked:after:justify-center 
        checked:after:w-full checked:after:h-full bg-white"
                    value=""
                  />
                  <span className="lbl ml-2">
                    Bỏ chọn tất cả (Nếu không chọn các danh mục loại hình hàng
                    hóa trên)
                  </span>
                </span>
              </label>
              <div className="italic text-red-600 bg-[#ebf6ff] p-2 rounded">
                <b>Ghi chú:&nbsp;</b>
                Doanh nghiệp hoàn toàn chịu trách nhiệm về tính chính xác đối
                với các thông tin lựa chọn thuộc đối tượng miễn, giảm phí khi
                khai báo trên hệ thống
                <a
                  className="text-blue-600 underline"
                  target="_blank"
                  href="/Files/hdsd/NGH%e1%bb%8a QUYẾT 102020NQ-HĐND SỬA ĐỔI.pdf"
                >
                  Chi tiết quy định...
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
