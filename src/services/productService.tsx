import { axiosInstance } from "./axiosService";

const url = "products/";

export const createProduct = async (
  title: string,
  description: string,
  price: string
) => {
  try {
    const requestBody = {
      title,
      description,
      price: parseInt(price),
    };
    return await axiosInstance.post(`${url}create-product`, requestBody);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getAllProducts = async (
  limit: number = 0,
  startIndex: number = 0
) => {
  try {
    const response = await axiosInstance.get(
      `${url}get-products?limit=${limit}&offset=${startIndex}`
    );

    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const removeProduct = async (id: string) => {
  try {
    return await axiosInstance.delete(`${url}remove-product/${id}`);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const updateProduct = async (product: any) => {
  try {
    const requestBody = {
      ...product,
      title: product.title,
      description: product.description,
      price: product.price,
    };
    await axiosInstance.put(`${url}update-product/${product.id}`, requestBody);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const searchProducts = async (
  searchValue: string,
  limit: number = 0,
  startIndex: number = 0
) => {
  let offset = limit * (startIndex - 1);
  try {
    const searchResult = await axiosInstance.get(
      `${url}search-products?searchValue=${searchValue}&limit=${limit}&offset=${offset}`
    );
    return searchResult.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
