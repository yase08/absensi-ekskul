import useAxiosPrivate from "../hooks/useAxiosPrivate";

const axiosPrivate = useAxiosPrivate();

export const getAllRoom = async () => {
  try {
    const response = await axiosPrivate.get(`/room`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const deleteRoom = async (id) => {
  try {
    const response = await axiosPrivate.delete(`/room/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const updateRoom = async (id, requestData) => {
  try {
    const response = await axiosPrivate.put(`/room/${id}`, requestData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const createRoom = async (requestData) => {
  try {
    const response = await axiosPrivate.post(`/room`, requestData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};
