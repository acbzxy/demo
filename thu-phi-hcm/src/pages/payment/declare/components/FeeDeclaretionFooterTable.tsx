import { useState } from "react";

export default function CargoTabs() {
  const [selectedTab, setSelectedTab] = useState("HANG_CONTAINER");

  const tabs = [
    { id: "HANG_CONTAINER", label: "Danh sách container" },
    { id: "HANG_ROILONGKIEN", label: "Danh sách hàng rời, lỏng, kiện" },
    { id: "HANG_CONTAINER_CFS", label: "Danh sách container CFS" },
    { id: "TOKHAI_CHUNG_CONT", label: "Danh sách tờ khai liên quan" },
    { id: "DINH_KEM", label: "Đính kèm" },
  ];

  return (
    <div className="p-4 bg-white rounded shadow">
      {/* Radio group */}
      <div className="flex gap-4 mb-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="LOAI_TK_NP"
            value="100"
            defaultChecked
            className="appearance-none w-4 h-4 border border-gray-400 rounded-none
                 checked:after:content-['✓'] checked:after:text-green-600 
                 checked:after:flex checked:after:items-center checked:after:justify-center 
                 checked:after:w-full checked:after:h-full bg-white"
          />
          <span>HÀNG CONTAINER</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="LOAI_TK_NP"
            value="101"
            className="appearance-none w-4 h-4 border border-gray-400 rounded-none
                 checked:after:content-['✓'] checked:after:text-green-600 
                 checked:after:flex checked:after:items-center checked:after:justify-center 
                 checked:after:w-full checked:after:h-full bg-white"
          />
          <span>HÀNG RỜI, LỎNG, KIỆN</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="LOAI_TK_NP"
            value="102"
            className="appearance-none w-4 h-4 border border-gray-400 rounded-none
                 checked:after:content-['✓'] checked:after:text-green-600 
                 checked:after:flex checked:after:items-center checked:after:justify-center 
                 checked:after:w-full checked:after:h-full bg-white"
          />
          <span>HÀNG CONTAINER TÍNH TRỌNG LƯỢNG (Không áp dụng cho CFS)</span>
        </label>
      </div>

      {/* Tabs header */}
      <ul className="flex border-b mb-4">
        {tabs.map((tab) => (
          <li key={tab.id}>
            <button
              className={`px-4 py-2 text-sm font-medium -mb-px border-b-2 transition-colors duration-200 ${
                selectedTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent hover:text-blue-500"
              }`}
              onClick={() => setSelectedTab(tab.id)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Tabs content */}
      <div>
        {selectedTab === "HANG_CONTAINER" && (
          <div>
            <div className="flex gap-2 mb-3">
              <button className="bg-blue-500 text-white px-4 py-1 rounded-full flex items-center gap-1">
                <i className="fa fa-plus-circle"></i> Thêm mới
              </button>
              <button className="bg-green-500 text-white px-4 py-1 rounded-full flex items-center gap-1">
                <i className="fa fa-file-excel-o"></i> Import Excel
              </button>
              <a
                href="/Files/FileTmp/DS_CHITIET_CONT.xls"
                className="text-blue-600 italic flex items-center gap-1"
              >
                <i className="fa fa-download"></i> Tải mẫu file import hàng cont
              </a>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="w-12 text-center border p-2">STT</th>
                    <th className="text-center border p-2">Số vận đơn</th>
                    <th className="text-center border p-2">
                      Số hiệu Container
                    </th>
                    <th className="text-center border p-2">Số Seal</th>
                    <th className="text-center border p-2">Loại Cont</th>
                    <th className="text-center border p-2">Tính chất Cont</th>
                    <th className="text-center border p-2">Ghi chú</th>
                    <th className="w-10 border p-2">#</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={8} className="text-center p-4">
                      Không có dữ liệu
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedTab === "HANG_ROILONGKIEN" && (
          <div>
            <a
              href="/Files/FileTmp/DS_CHITIET_ROI.xlsx"
              className="text-blue-600 italic flex items-center gap-1 mb-3"
            >
              <i className="fa fa-download"></i> Tải mẫu file import hàng
              lỏng,rời
            </a>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="w-12 text-center border p-2">STT</th>
                    <th className="text-center border p-2">Số vận đơn</th>
                    <th className="text-center border p-2">Tổng trọng lượng</th>
                    <th className="text-center border p-2">ĐVT</th>
                    <th className="text-center border p-2">Ghi chú</th>
                    <th className="w-10 border p-2">#</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={6} className="text-center p-4">
                      Không có dữ liệu
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedTab === "HANG_CONTAINER_CFS" && (
          <div>
            <a
              href="/Files/FileTmp/DS_CHITIET_CONT_CFS.xlsx"
              className="text-blue-600 italic flex items-center gap-1 mb-3"
            >
              <i className="fa fa-download"></i> Tải mẫu file import hàng
              container CFS
            </a>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="w-12 text-center border p-2">STT</th>
                    <th className="text-center border p-2">
                      Số hiệu container
                    </th>
                    <th className="text-center border p-2">Tổng trọng lượng</th>
                    <th className="text-center border p-2">ĐVT</th>
                    <th className="text-center border p-2">Ghi chú</th>
                    <th className="w-10 border p-2">#</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={6} className="text-center p-4">
                      Không có dữ liệu
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedTab === "TOKHAI_CHUNG_CONT" && (
          <div>
            <a
              href="/Files/FileTmp/Mau_danh_sach_to_khai_chung_container.xlsx"
              className="text-blue-600 italic flex items-center gap-1 mb-3"
            >
              <i className="fa fa-download"></i> Tải mẫu file import tờ khai
              chung container
            </a>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="w-12 text-center border p-2">STT</th>
                    <th className="text-center border p-2">Số tờ khai</th>
                    <th className="text-center border p-2">Ngày tờ khai</th>
                    <th className="text-center border p-2">Mã loại hình</th>
                    <th className="text-center border p-2">Mã hải quan</th>
                    <th className="w-10 border p-2">#</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={6} className="text-center p-4">
                      Không có dữ liệu
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedTab === "DINH_KEM" && (
          <div>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="w-12 text-center border p-2">STT</th>
                    <th className="text-center border p-2">Mô tả loại file</th>
                    <th className="text-center border p-2" colSpan={2}>
                      File đính kèm
                    </th>
                    <th className="w-10 border p-2">#</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={5} className="text-center p-4">
                      Không có dữ liệu
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
