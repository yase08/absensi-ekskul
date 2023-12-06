import axios from "axios";
import { API, VERSION } from "../utils/baseUrl";
import { config } from "../utils/config";

export const getAllTask = async () => {
  try {
    const response = await axios.get(`${API}/${VERSION}/task`, config);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await axios.delete(`${API}/${VERSION}/task/${id}`, config);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const updateTask = async (id, requestData) => {
  try {
    const response = await axios.put(
      `${API}/${VERSION}/task/${id}`,
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

export const createTask = async (requestData) => {
  try {
    const response = await axios.post(
      `${API}/${VERSION}/task`,
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
