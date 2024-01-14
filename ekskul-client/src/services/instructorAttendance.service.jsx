import useAxiosPrivate from "../hooks/useAxiosPrivate";

export const getAllInstructorAttendance = async () => {
  try {
    const response = await axios.get(
<<<<<<< HEAD:ekskul-client/src/services/rombel.service.ts
      `${API}/${VERSION}/rombel?filter=${filter}&sort=${sort}&page[size]=${size}&page[number]=${number}`,
=======
      `${API}/${VERSION}/instructor-attendance`,
>>>>>>> c8887d90d85c53b76096291f72975cd45949f855:ekskul-client/src/services/instructorAttendance.service.jsx
      config
    );
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
    const response = await axios.post(
      `${API}/${VERSION}/instructor-attendance`,
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
