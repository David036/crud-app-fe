export interface UserInputsProps {
  setName: (name: string) => void;
  setSurname: (surname: string) => void;
  setAge: (age: string) => void;
  handleCreate: () => void;
}

export interface ErrorTypes {
  success: boolean;
  message: string;
}
