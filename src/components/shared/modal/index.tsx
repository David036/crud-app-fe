import { Modal as AntdModal } from "antd";
import { ModalProps } from "./types";

export default function Modal({ children, isModalOpen, onClose }: ModalProps) {
  return (
    <>
      <AntdModal open={isModalOpen} onCancel={onClose} footer={null}>
        {children}
      </AntdModal>
    </>
  );
}
