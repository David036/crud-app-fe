import { UserTypes } from "../usersTable/types";

export interface ModalProps {
  selectedUser: UserTypes;
  getUsers: () => Promise<void>;
  editModalIsVisible: boolean;
  onClose: () => void;
}
