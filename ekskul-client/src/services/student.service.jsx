import axios from "axios";
import { API, VERSION } from "../utils/baseUrl";
import { config } from "../utils/config";

export const getAllStudent = async () => {
  try {
    const response = await axios.get(
      `${API}/${VERSION}/student`,
      config
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const getAllStudentByEkskul = async (ekskul_id) => {
  try {
    const response = await axios.get(
      `${API}/${VERSION}/student?ekskul=${ekskul_id}`,
      config
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const deleteStudent = async (id) => {
  try {
    const response = await axios.delete(
      `${API}/${VERSION}/student/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const updateStudent = async (id, requestData) => {
  try {
    const response = await axios.put(
      `${API}/${VERSION}/student/${id}`,
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

export const createStudent = async (requestData) => {
  try {
    const response = await axios.post(
      `${API}/${VERSION}/student`,
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
