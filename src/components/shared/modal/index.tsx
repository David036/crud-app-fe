import { Modal as AntdModal } from "antd";
import { ModalProps } from "./types";

export default function Modal({
  children,
  isModalOpen,
  onClose,
  ...rest
}: ModalProps) {
  return (
    <>
      <AntdModal open={isModalOpen} onCancel={onClose} footer={null} {...rest}>
        {children}
      </AntdModal>
    </>
  );
}
