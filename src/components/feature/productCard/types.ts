import { ProductTypes } from "../products/types";

export interface CardProps {
  title: string;
  description: string;
  price: string;
  product: ProductTypes;
  handleEdit: (item: ProductTypes) => void;
  handleDelete: (item: ProductTypes) => void;
}
