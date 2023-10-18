import { UserTypes } from "../usersTable/types";

export interface DeleteModalProps {
  deleteModalIsVisible: boolean;
  onClose: () => void;
  selectedUser: UserTypes;
  getUsers: () => Promise<void>;
}
