import useAxiosPrivate from "../hooks/useAxiosPrivate";

const axiosPrivate = useAxiosPrivate();

export const getAllRombel = async () => {
  try {
    const response = await axiosPrivate.get(`/rombel`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const deleteRombel = async (id) => {
  try {
    const response = await axiosPrivate.delete(`/rombel/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const updateRombel = async (id, requestData) => {
  try {
    const response = await axiosPrivate.put(`/rombel/${id}`, requestData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const createRombel = async (requestData) => {
  try {
    const response = await axiosPrivate.post(`/rombel`, requestData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};
