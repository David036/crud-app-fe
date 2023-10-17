import openNotification from "../components/shared/notification";
import { axiosInstance } from "./axiosService";
import { NotificationTypes } from "../components/shared/notification/types";

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
  } catch (error: any) {
    openNotification({
      type: NotificationTypes.ERROR,
      message: error.response.data.error,
      description: "",
    });
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
