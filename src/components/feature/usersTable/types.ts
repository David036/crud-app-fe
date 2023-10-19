export interface UserTypes {
  id: string;
  name: string;
  surname: string;
  age: number;
}

export interface UserTableProps {
  users: UserTypes[];
  getUsers: () => Promise<void>;
  setUsers: any;
  setCurrentPage: (page: number) => void;
  setLimit: (limit: number) => void;
  limit: number;
  currentPage: number;
}
