import axios from "axios";
import { API, VERSION } from "../utils/baseUrl";
import { config } from "../utils/config";

export const getAllTask = async ({ filter, sort, size, number }) => {
  try {
    const response = await axios.get(
      `${API}${VERSION}/task?filter=${filter}&sort=${sort}&page[size]=${size}&page[number]=${number}`,
      config
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await axios.delete(`${API}${VERSION}/task/${id}`, config);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const updateTask = async (id) => {
  try {
    const response = await axios.delete(`${API}${VERSION}/task/${id}`, config);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const createTask = async (requestData) => {
  try {
    const response = await axios.post(
      `${API}${VERSION}/task`,
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