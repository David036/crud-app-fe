import { UserTypes } from "../usersTable/types";

export interface DeleteModalProps {
  deleteModalIsVisible: boolean;
  onClose: () => void;
  selectedUserId: string;
  deleteFunction: (id: string) => void;
  selectedUserTitle: string;
}
