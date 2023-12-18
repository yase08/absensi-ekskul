import axios from "axios";
import { API, VERSION } from "../utils/baseUrl";
import { config } from "../utils/config";

export const getAllAssessment = async ({ filter, sort, size, number }) => {
  try {
    const response = await axios.get(
      `${API}/${VERSION}/assessment?filter=${filter}&sort=${sort}&page[size]=${size}&page[number]=${number}`,
      config
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const getAssessmentByTask = async ({task_id}) => {
  try {
    const response = await axios.get(
      `${API}/${VERSION}/assessment?task_id=${task_id}`,
      config
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const deleteAssessment = async (id) => {
  try {
    const response = await axios.delete(
      `${API}/${VERSION}/assessment/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const updateAssessment = async (id) => {
  try {
    const response = await axios.delete(
      `${API}/${VERSION}/assessment/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const createAssessment = async (requestData) => {
  try {
    const response = await axios.post(
      `${API}/${VERSION}/assessment`,
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
