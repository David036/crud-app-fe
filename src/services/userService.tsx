import { UserTypes } from "../components/usersTable/types";
import { axiosInstance } from "./axiosService";

const url = "users/";

export const createUser = async (
  name: string,
  surname: string,
  age: string
) => {
  try {
    const requestBody = {
      name,
      surname,
      age: parseInt(age),
    };
    await axiosInstance.post(`${url}create-user`, requestBody);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get(`${url}get-users`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const removeUser = async (id: string) => {
  try {
    await axiosInstance.delete(`${url}remove-user/${id}`);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const updateUser = async (user: UserTypes) => {
  try {
    const requestBody = {
      ...user,
      name: user.name,
      surname: user.surname,
      age: user.age,
    };
    await axiosInstance.put(`${url}update-user/${user.id}`, requestBody);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const searchUsers = async (searchValue: string) => {
  try {
    const searchResult = await axiosInstance.get(
      `${url}search-users?searchValue=${searchValue}`
    );
    return searchResult.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
