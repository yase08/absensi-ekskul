import axios from "axios";
import { API, VERSION } from "../utils/baseUrl";
import { config } from "../utils/config";

export const login = async (requestData) => {
  try {
    const response = await axios.post(
      `${API}/${VERSION}/auth/login`,
      requestData
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.message);
      throw error.response.data.message;
    }
  }
};

export const getProfile = async () => {
  try {
    const response = await axios.get(`${API}/${VERSION}/auth/profile`, config);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.message);
      throw error.response.data.message;
    }
  }
};

export const forgotPassword = async (requestData) => {
  try {
    const response = await axios.post(
      `${API}/${VERSION}/auth/forgot-password`,
      requestData
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const resetToken = async (token, requestData) => {
  try {
    const response = await axios.post(
      `${API}/${VERSION}/auth/reset-token/${token}`,
      requestData
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const logout = async () => {
  try {
    const response = await axios.get(`${API}/${VERSION}/auth/logout`, config);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const getUsersCount = async () => {
  try {
    const response = await axios.get(`${API}/${VERSION}/auth/count`, config);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};
