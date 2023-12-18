import useAxiosPrivate from "../hooks/useAxiosPrivate";

const axiosPrivate = useAxiosPrivate();

export const getAllTask = async () => {
  try {
    const response = await axiosPrivate.get(`/task`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await axiosPrivate.delete(`/task/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const updateTask = async (id, requestData) => {
  try {
    const response = await axiosPrivate.put(`/task/${id}`, requestData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const createTask = async (requestData) => {
  try {
    const response = await axiosPrivate.post(`/task`, requestData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};
