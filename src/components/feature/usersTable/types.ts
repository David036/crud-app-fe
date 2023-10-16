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
}
