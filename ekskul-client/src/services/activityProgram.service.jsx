import axios from "axios";
import { API, VERSION } from "../utils/baseUrl";
import { config } from "../utils/config";

export const getAllActivityProgram = async () => {
  try {
    const response = await axios.get(
      `${API}/${VERSION}/activity-program`,
      config
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const deleteActivityProgram = async (id) => {
  try {
    const response = await axios.delete(
      `${API}/${VERSION}/activity-program/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const updateActivityProgram = async (id, requestData) => {
  try {
    const response = await axios.put(
      `${API}/${VERSION}/activity-program/${id}`,
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

export const createActivityProgram = async (requestData) => {
  try {
    const response = await axios.post(
      `${API}/${VERSION}/activity-program`,
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
