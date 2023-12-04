import axios from "axios";
import { API, VERSION } from "../utils/baseUrl";
import { config } from "../utils/config";

export const getAllSchedule = async ({ filter, sort, size, number }) => {
  try {
    const response = await axios.get(
      `${API}/${VERSION}/schedule?filter=${filter}&sort=${sort}&page[size]=${size}&page[number]=${number}`,
      config
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const getSchedule = async () => {
  try {
    const response = await axios.get(`${API}/${VERSION}/schedule/data`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const deleteActivity = async (id) => {
  try {
    const response = await axios.delete(
      `${API}/${VERSION}/schedule/activity/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const updateActivity = async (id) => {
  try {
    const response = await axios.delete(
      `${API}/${VERSION}/schedule/activity/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const createSchedule = async (requestData) => {
  try {
    const response = await axios.post(
      `${API}/${VERSION}/schedule`,
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

export const createActivity = async (requestData) => {
  try {
    const response = await axios.post(
      `${API}/${VERSION}/schedule/activity`,
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
