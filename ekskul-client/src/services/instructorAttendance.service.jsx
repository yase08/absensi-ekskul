import axios from "axios";
import { API, VERSION } from "../utils/baseUrl";
import { config } from "../utils/config";

export const getAllInstructorAttendance = async ({ filter, sort, size, number }) => {
  try {
    const response = await axios.get(
      `${API}${VERSION}/instructorAttendance?filter=${filter}&sort=${sort}&page[size]=${size}&page[number]=${number}`,
      config
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const deleteInstructorAttendance = async (id) => {
  try {
    const response = await axios.delete(`${API}${VERSION}/instructorAttendance/${id}`, config);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const updateInstructorAttendance = async (id) => {
  try {
    const response = await axios.delete(
      `${API}${VERSION}/instructorAttendance/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const createInstructorAttendance = async (requestData) => {
  try {
    const response = await axios.post(
      `${API}${VERSION}/instructorAttendance`,
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
