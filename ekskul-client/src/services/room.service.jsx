import axios from "axios";
import { API, VERSION } from "../utils/baseUrl";
import { config } from "../utils/config";

export const getAllRoom = async () => {
  try {
    const response = await axios.get(
      `${API}/${VERSION}/room`,
      config
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const deleteRoom = async (id) => {
  try {
    const response = await axios.delete(`${API}/${VERSION}/room/${id}`, config);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const updateRoom = async (id, requestData) => {
  try {
    const response = await axios.put(
      `${API}/${VERSION}/room/${id}`,
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

export const createRoom = async (requestData) => {
  try {
    const response = await axios.post(
      `${API}/${VERSION}/room`,
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
