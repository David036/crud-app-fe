import axios from "axios";
import { axiosInstance } from "./axiosService";

const url = "auth/";

export const signup = async (email: string, password: string) => {
  try {
    const requestBody = {
      email,
      password,
    };
    return await axiosInstance.post(`${url}signup`, requestBody);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const login = async (email: string, password: string) => {
  try {
    const requestBody = {
      email,
      password,
    };
    return await axiosInstance.post(`${url}login`, requestBody);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getCurrentUser = async () => {
  try {
    return await axiosInstance.get(`${url}getCurrentUser`);
  } catch (error) {
    console.error("Error:", error);
  }
};
