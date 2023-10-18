import axios from "axios";
import { API, VERSION } from "../utils/baseUrl";
import { config } from "../utils/config";

export const getAllGallery = async ({ filter, sort, size, number }) => {
  try {
    const response = await axios.get(
      `${API}${VERSION}/gallery?filter=${filter}&sort=${sort}&page[size]=${size}&page[number]=${number}`,
      config
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const getGallery = async (slug) => {
  try {
    const response = await axios.get(
      `${API}${VERSION}/gallery/${slug}`,
      config
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const deleteGallery = async (id) => {
  try {
    const response = await axios.delete(
      `${API}${VERSION}/gallery/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const updateGallery = async (id) => {
  try {
    const response = await axios.delete(
      `${API}${VERSION}/gallery/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const createGallery = async (requestData) => {
  try {
    const response = await axios.post(
      `${API}${VERSION}/gallery`,
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
