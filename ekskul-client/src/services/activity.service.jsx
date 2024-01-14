import useAxiosPrivate from "../hooks/useAxiosPrivate";

const axiosPrivate = useAxiosPrivate();

export const getAllActivity = async () => {
  try {
    const response = await axiosPrivate.get(`/activity`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const deleteActivity = async (id) => {
  try {
    const response = await axiosPrivate.delete(`/activity/${id}`, config);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const updateActivity = async (id, requestData) => {
  try {
    const response = await axiosPrivate.put(`/activity/${id}`, requestData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
  }
};

export const createActivity = async (requestData) => {
  try {
    const response = await axiosPrivate.post(`/activity`, requestData);
    return response.data.statusMessage;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
  }
};
