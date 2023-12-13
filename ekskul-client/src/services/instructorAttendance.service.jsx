import useAxiosPrivate from "../hooks/useAxiosPrivate";

const axiosPrivate = useAxiosPrivate();

export const getAllInstructorAttendance = async () => {
  try {
    const response = await axiosPrivate.get(`/instructorAttendance`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const deleteInstructorAttendance = async (id) => {
  try {
    const response = await axiosPrivate.delete(`/instructorAttendance/${id}`, config);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const updateInstructorAttendance = async (id) => {
  try {
    const response = await axiosPrivate.delete(`/instructorAttendance/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const createInstructorAttendance = async (requestData) => {
  try {
    const response = await axiosPrivate.post(`/instructorAttendance`, requestData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};
