import axios, { axiosPrivate } from "../utils/config";

export const login = async (requestData) => {
  try {
    const response = await axios.post(`/auth/login`, requestData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
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
    const response = await axiosPrivate.get(`/auth/profile`);
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
      `/auth/forgot-password`,
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
      `/auth/reset-token/${token}`,
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
    const response = await axiosPrivate.get(`/auth/logout`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const getUsersCount = async () => {
  try {
    const response = await axiosPrivate.get(`/auth/count`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};
