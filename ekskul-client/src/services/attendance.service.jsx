import axios from "axios";
import { API, VERSION } from "../utils/baseUrl";
import { config } from "../utils/config";

export const getAllAttendance = async ({ filter, sort, size, number }) => {
  try {
    const response = await axios.get(
      `${API}/${VERSION}/attendance?filter=${filter}&sort=${sort}&page[size]=${size}&page[number]=${number}`,
      config
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const updateAttendance = async (id) => {
  try {
    const response = await axios.delete(
      `${API}/${VERSION}/attendance/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const createAttendance = async (requestData) => {
  try {
    const response = await axios.post(
      `${API}/${VERSION}/attendance`,
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
