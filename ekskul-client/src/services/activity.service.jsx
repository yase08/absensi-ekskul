import axios from "axios";
import { API, VERSION } from "../utils/baseUrl";
import { config } from "../utils/config";

export const getAllActivity = async () => {
  try {
    const response = await axios.get(
      `${API}/${VERSION}/activity`,
      config
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const deleteActivity = async (id) => {
  try {
    const response = await axios.delete(`${API}/${VERSION}/activity/${id}`, config);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const updateActivity = async (id, requestData) => {
  try {
    const response = await axios.put(
      `${API}/${VERSION}/activity/${id}`,
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

export const createActivity = async (requestData) => {
  try {
    const response = await axios.post(
      `${API}/${VERSION}/activity`,
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
