import {
  ArrowLeftCircleIcon,
  CheckCircleIcon,
  ChevronDoubleRightIcon,
  MagnifyingGlassIcon,
  WindowIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import FeeDeclarationForm from "./FeeDeclarationForm";
import CargoTabs from "./FeeDeclaretionFooterTable";

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
      <div className="modal-header fixed top-[85px] w-[calc(100%-45px)] z-20 bg-white">
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
      <div className="modal-body mt-[40px] pr-[15px] pb-[100px] pl-[15px] bg-[#E8EBEF] min-h-[278px]">
        <div className="w-full">
          <ul
            id="progressbar"
            className="progressbar flex justify-between relative mb-3"
          >
            <li className="step active">Tạo tờ khai phí</li>
            <li className="step">Ký số (Khai báo nộp phí)</li>
            <li className="step">Lấy thông báo phí</li>
            <li className="step">Thực hiện nộp phí</li>
            <li className="step">
              <span className="flex items-center gap-1 justify-center">
                <CheckCircleIcon className="w-4 h-4 text-green-600" />
                <span>Hoàn thành</span>
              </span>
            </li>
          </ul>
        </div>

        <div className="data-master">
          <div className="font-bold uppercase mb-1">
            Nguồn thông tin tờ khai
          </div>
          <div className="item-frame flex items-center">
            <label className="flex items-center mr-6 cursor-pointer">
              <input
                type="radio"
                name="feeOption"
                defaultChecked
                className="appearance-none w-4 h-4 border border-gray-400 rounded-none
                 checked:after:content-['✓'] checked:after:text-green-600 
                 checked:after:flex checked:after:items-center checked:after:justify-center 
                 checked:after:w-full checked:after:h-full bg-white"
              />
              <span className="ml-2 uppercase">Lấy thông tin từ Hải quan</span>
            </label>
            <div className="flex items-center mx-2">
              <ChevronDoubleRightIcon className="w-3  h-3" />
              <input
                type="text"
                className="border h-[33px] w-[120px] me-1"
                defaultValue={"0109844160"}
              />
              <input
                type="text"
                className="border h-[33px] w-[100px] me-1"
                placeholder="Số tờ khai HQ"
              />
              <button className="btn btn-primary w-[130px] font-normal bg-[#deecf9] text-[#005a9e] rounded-none pt-[4px] hover:text-white">
                <MagnifyingGlassIcon className="w-3  h-3" />
                &nbsp;Lấy thông tin
              </button>
              <span className="font-bold ms-4">|</span>
            </div>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="feeOption"
                className="appearance-none w-4 h-4 border border-gray-400 rounded-none
                 checked:after:content-['✓'] checked:after:text-green-600 
                 checked:after:flex checked:after:items-center checked:after:justify-center 
                 checked:after:w-full checked:after:h-full bg-white"
              />
              <span className="ml-2 uppercase">
                Khai báo tờ khai phí thủ công
              </span>
            </label>
          </div>
          <FeeDeclarationForm />
          <CargoTabs />
        </div>
      </div>
    </motion.div>
  );
}
