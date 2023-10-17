export enum NotificationTypes {
  SUCCESS = "success",
  INFO = "info",
  WARNING = "warning",
  ERROR = "error",
}

export interface NotificationProps {
  type: NotificationTypes;
  message: string;
  description: string;
}
