import useAxiosPrivate from "../hooks/useAxiosPrivate";

const axiosPrivate = useAxiosPrivate();

export const getAllRayon = async () => {
  try {
    const response = await axiosPrivate.get(`/rayon`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const deleteRayon = async (id) => {
  try {
    const response = await axiosPrivate.delete(`/rayon/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const updateRayon = async (id, requestData) => {
  try {
    const response = await axiosPrivate.put(`/rayon/${id}`, requestData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
  }
};

export const createRayon = async (requestData) => {
  try {
    const response = await axiosPrivate.post(`/rayon`, requestData);
    return response.data.statusMessage;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
  }
};
