import useAxiosPrivate from "../hooks/useAxiosPrivate";
import config from "../utils/config";

const axiosPrivate = useAxiosPrivate();

export const getAllActivityProgram = async () => {
  try {
    const response = await axiosPrivate.get(`/activity-program`, config);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const deleteActivityProgram = async (id) => {
  try {
    const response = await axiosPrivate.delete(`/activity-program/${id}`, config);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const updateActivityProgram = async (id, requestData) => {
  try {
    const response = await axiosPrivate.put(
      `/activity-program/${id}`,
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

export const createActivityProgram = async (requestData) => {
  try {
    const response = await axiosPrivate.post(`/activity-program`, requestData, config);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};
