import { useEffect, useState } from "react";
import ProductsInputs from "../productsInputs";
import {
  createProduct,
  getAllProducts,
  removeProduct,
  searchProducts,
  updateProduct,
} from "../../../services/productService";
import openNotification from "../../shared/notification";
import { NotificationTypes } from "../../shared/notification/types";
import ProductCards from "../productCards";
import { ProductTypes } from "./types";
import EditModal from "../editModal";
import DeleteModal from "../deleteModal";
import { Pagination, PaginationProps } from "antd";
import Search from "antd/es/input/Search";

import styles from "./products.module.scss";

export default function Products() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>("");
  const [limit, setLimit] = useState<number>(6);
  const [countOfPage, setCountOfPage] = useState<number>(0);
  const [editModalIsVisible, setEditModalIsVisible] = useState<boolean>(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductTypes | null>(
    null
  );
  const [deleteModalIsVisible, setDeleteModalIsVisible] =
    useState<boolean>(false);
  const [newTitle, setNewTitle] = useState(selectedProduct?.title);
  const [newDescription, setNewDescription] = useState(
    selectedProduct?.description
  );
  const [newPrice, setNewPrice] = useState(`${selectedProduct?.price}`);

  const getProducts = async (): Promise<void> => {
    const res = await getAllProducts(limit, limit * (currentPage - 1));
    if (res?.success) {
      setProducts(res.data);
      setCountOfPage(res.count);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const editProduct = async () => {
    if (selectedProduct) {
      const editedProduct = {
        id: selectedProduct.id,
        title: newTitle ?? selectedProduct.title,
        description: newDescription ?? selectedProduct.description,
        price: parseInt(newPrice),
      };

      if (editedProduct) {
        await updateProduct(editedProduct);
        setEditModalIsVisible(false);
        setSelectedProduct(null);
        getProducts();
      }
    }
  };

  const handleCreate = async () => {
    const createdProduct = await createProduct(title, description, price);
    if (createdProduct?.data.success) {
      openNotification({
        type: NotificationTypes.SUCCESS,
        message: `User "${createdProduct.data.data.title}" was successfully created`,
        description: "",
      });
      await getProducts();
    }
  };

  const handleDelete = (item: ProductTypes) => {
    setSelectedProduct(item);
    setDeleteModalIsVisible(true);
  };

  const handleEdit = (item: ProductTypes) => {
    setSelectedProduct(item);
    setEditModalIsVisible(true);
  };

  const handleSearch = async () => {
    const searchedProducts = await searchProducts(
      searchValue,
      limit,
      currentPage
    );

    if (searchedProducts?.data) {
      setProducts(searchedProducts.data);
      setCountOfPage(searchedProducts.count);
    }
  };

  let newValues;

  if (selectedProduct) {
    newValues = [
      {
        value: selectedProduct.title,
        changeValue: setNewTitle,
        type: "string",
      },
      {
        value: selectedProduct.description,
        changeValue: setNewDescription,
        type: "string",
      },
      {
        value: selectedProduct.price,
        changeValue: setNewPrice,
        type: "number",
      },
    ];
  }

  const deleteProduct = async (id: string) => {
    const removedProduct = await removeProduct(id);

    if (removedProduct?.data.success) {
      openNotification({
        type: NotificationTypes.SUCCESS,
        message: `Product "${removedProduct.data.data.title}" was successfully deleted`,
        description: "",
      });
      setDeleteModalIsVisible(false);
      setCurrentPage(1);
      getProducts();
    }
  };

  const onChange: PaginationProps["onChange"] = (page, pageSize) => {
    setCurrentPage(page);
    setLimit(pageSize);
  };

  useEffect(() => {
    handleSearch();
  }, [limit, currentPage]);

  return (
    <div className={styles.container}>
      {selectedProduct && (
        <EditModal
          newValues={newValues}
          editFunction={editProduct}
          key={selectedProduct.id}
          editModalIsVisible={editModalIsVisible}
          onClose={() => {
            setEditModalIsVisible(false);
            setSelectedProduct(null);
          }}
        />
      )}
      {selectedProduct && (
        <DeleteModal
          selectedUserId={selectedProduct.id}
          selectedUserTitle={selectedProduct.title}
          deleteFunction={deleteProduct}
          deleteModalIsVisible={deleteModalIsVisible}
          onClose={() => {
            setDeleteModalIsVisible(false);
          }}
        />
      )}
      <ProductsInputs
        handleCreate={handleCreate}
        setPrice={setPrice}
        setDescription={setDescription}
        setTitle={setTitle}
      />
      <Search
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="input search text"
        allowClear={false}
        enterButton="Search"
        size="large"
        onSearch={handleSearch}
      />
      <ProductCards
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        products={products}
      />
      <Pagination
        pageSizeOptions={["6", "12", "18", "36"]}
        showSizeChanger
        defaultPageSize={6}
        onChange={onChange}
        current={currentPage}
        total={countOfPage}
      />
    </div>
  );
}
