export interface CreateModalProps {
  onClose: () => void;
  createModalIsVisible: boolean;
  handleCreate: () => void;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setPrice: (price: string) => void;
  title: string;
  description: string;
  price: string;
}
