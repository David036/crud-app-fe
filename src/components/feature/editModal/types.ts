import { UserTypes } from "../usersTable/types";

export interface EditModalProps {
  selectedUser: UserTypes;
  getUsers: () => Promise<void>;
  editModalIsVisible: boolean;
  onClose: () => void;
}
