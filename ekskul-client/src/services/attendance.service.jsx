import useAxiosPrivate from "../hooks/useAxiosPrivate";

const axiosPrivate = useAxiosPrivate();

export const getAllAttendance = async () => {
  try {
    const response = await axiosPrivate.get(`/attendance`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const updateAttendance = async (id) => {
  try {
    const response = await axiosPrivate.delete(`/attendance/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const createAttendance = async (requestData) => {
  try {
    const response = await axiosPrivate.post(`/attendance`, requestData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};
