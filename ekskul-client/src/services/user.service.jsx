import axios from "axios";
import { API, VERSION } from "../utils/baseUrl";
import { config } from "../utils/config";

export const getAllUser = async () => {
  try {
    const response = await axios.get(`${API}/${VERSION}/user`, config);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API}/${VERSION}/user/${id}`, config);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const updateUser = async (id) => {
  try {
    const response = await axios.delete(`${API}/${VERSION}/user/${id}`, config);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const createUser = async (requestData) => {
  try {
    const response = await axios.post(
      `${API}/${VERSION}/user`,
      requestData,
      config
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};
