import { ProductTypes } from "../products/types";

export interface ProductCardsProps {
  products: ProductTypes[];
  handleDelete: (item: ProductTypes) => void;
  handleEdit: (item: ProductTypes) => void;
}
