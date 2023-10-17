import { notification } from "antd";
import { NotificationProps } from "./types";

export default function openNotification({
  type,
  message,
  description,
}: NotificationProps) {
  return notification[type]({
    message,
    description,
  });
}
