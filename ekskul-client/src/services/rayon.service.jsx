import axios from "axios";
import { API, VERSION } from "../utils/baseUrl";
import { config } from "../utils/config";

export const getAllRayon = async () => {
  try {
    const response = await axios.get(
      `${API}/${VERSION}/rayon`,
      config
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const deleteRayon = async (id) => {
  try {
    const response = await axios.delete(`${API}/${VERSION}/rayon/${id}`, config);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const updateRayon = async (id, requestData) => {
  try {
    const response = await axios.put(
      `${API}/${VERSION}/rayon/${id}`,
      requestData,
      config
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
  }
};

export const createRayon = async (requestData) => {
  try {
    const response = await axios.post(
      `${API}/${VERSION}/rayon`,
      requestData,
      config
    );
    return response.data.statusMessage;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
  }
};
