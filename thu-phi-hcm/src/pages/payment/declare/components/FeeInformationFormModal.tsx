import { ArrowLeftCircleIcon, WindowIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export default function FeeInformationFormModal({ onClose }: { onClose: any }) {
  return (
    <motion.div
      className="w-full flex flex-col bg-white"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.3 }}
    >
      {/* Header */}
      <div className="modal-header absolute top-0 w-full">
        <h4 className="modal-title">
          <button
            onClick={onClose}
            className="btn btn-default text-blue-500 me-4 rounded-none"
          >
            <ArrowLeftCircleIcon className="w-4 h-4" />
            Quay lại
          </button>
          <span className="font-semibold">Thông Tin Tờ Khai Phí</span>
        </h4>
        <div>
          <button className="btn btn-default bg-blue-800 text-white rounded-none">
            <WindowIcon className="w-4 h-4 me-1" />
            Lưu lại
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <p>Đây là nội dung trong modal.</p>
        <p>Bạn có thể thêm form, bảng, input...</p>
        <p>
          Modal này chiếm toàn bộ diện tích <b>component cha</b>, không tràn
          full màn hình.
        </p>

        {/* Ví dụ form */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tên phí:</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="Nhập tên phí"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Số tiền:</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              placeholder="Nhập số tiền"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Lưu
          </button>
        </form>
      </div>
    </motion.div>
  );
}
