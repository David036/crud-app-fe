import { UserTypes } from "../usersTable/types";

export interface ModalProps {
  setEditModalIsOpen: (value: boolean) => void;
  selectedUser: UserTypes;
  getUsers: () => Promise<void>;
}
