import axios from "../utils/config";

import useAxiosPrivate from "../hooks/useAxiosPrivate";

const axiosPrivate = useAxiosPrivate();

export const getAllGallery = async () => {
  try {
    const response = await axiosPrivate.get(`/gallery`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const getDetailGallery = async (slug) => {
  try {
    const response = await axiosPrivate.get(`/gallery/detail/${slug}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const getGallery = async (slug) => {
  try {
    const response = await axios.get(`/gallery/${slug}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const deleteGallery = async (id) => {
  try {
    const response = await axiosPrivate.delete(`/gallery/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const updateGallery = async (id) => {
  try {
    const response = await axiosPrivate.delete(`/gallery/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const createGallery = async (requestData) => {
  try {
    const response = await axiosPrivate.post(`/gallery`, requestData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};
