import { UserTypes } from "../usersTable/types";

export interface EditModalProps {
  newValues: any;
  editModalIsVisible: boolean;
  onClose: () => void;
  editFunction: () => void;
}
