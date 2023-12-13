import useAxiosPrivate from "../hooks/useAxiosPrivate";

const axiosPrivate = useAxiosPrivate();

export const getAllStudent = async () => {
  try {
    const response = await axiosPrivate.get(`/student`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const deleteStudent = async (id) => {
  try {
    const response = await axiosPrivate.delete(`/student/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const updateStudent = async (id, requestData) => {
  try {
    const response = await axiosPrivate.put(`/student/${id}`, requestData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const createStudent = async (requestData) => {
  try {
    const response = await axiosPrivate.post(`/student`, requestData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};
