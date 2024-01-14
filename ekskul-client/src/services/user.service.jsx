import useAxiosPrivate from "../hooks/useAxiosPrivate";

const axiosPrivate = useAxiosPrivate();

export const getAllUser = async () => {
  try {
    const response = await axiosPrivate.get(`/user`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axiosPrivate.delete(`/user/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const updateUser = async (id) => {
  try {
    const response = await axiosPrivate.delete(`/user/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const createUser = async (requestData) => {
  try {
    const response = await axiosPrivate.post(`/user`, requestData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};
